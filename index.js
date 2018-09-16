#!/usr/bin/env node
/* eslint-disable no-console, no-void */

const emojiRegex = require(`emoji-regex`)()
const { promisify } = require(`util`)
const glob = promisify(require(`glob`))
const { promises } = require(`fs`)
const path = require(`path`)

const [, , codeSource, svgTarget, svgSource] = process.argv

if (!codeSource || !svgTarget || !svgSource) {
  console.error(`usage: emoji-extrator <code source> <svg target> <svg source>`)
  process.exit()
}

const codePoint = symbol => symbol.codePointAt(0).toString(16)

const main = async () => {
  const [sources, svgs] = await Promise.all([glob(codeSource), glob(svgSource)])
  console.log({ codeSource, svgSource, svgTarget })
  console.log({ sources: sources.length, svgs: svgs.length })
  const emojis = new Set()
  void (await Promise.all(sources.map(name => promises.readFile(name)))).forEach(
    text => void (String(text).match(emojiRegex) || []).forEach(emoji => void emojis.add(emoji)),
  )
  console.log({ emojis: emojis.size })
  try {
    await promises.mkdir(svgTarget)
  } catch (e) {
    console.error(`SVG target exists`)
  }
  const names = [...emojis]
    .map(codePoint)
    .map(point => `${point}.svg`)
    .map(targetName => ({
      targetName,
      sourceName: svgs.find(sourceName => sourceName.endsWith(targetName)),
    }))
  const copied = await Promise.all(
    names.map(({ targetName, sourceName }) =>
      promises.copyFile(sourceName, path.join(svgTarget, targetName)),
    ),
  )
  console.log({ copied: copied.length })
  await promises.writeFile(path.join(svgTarget, `files.json`), JSON.stringify(names))
}

main()
