# emoji-extractor

Ultra-basic tool to extract emojis used in source code and prepare .svg images to be used as a fallback.

## Usage

```
npx emoji-extrator <code source> <svg target> <svg source>
```
For example:
```sh
npx emoji-extractor 'src/**/*.js' 'build/emojis' '../emojitwo/svg/*.svg'
# Scans all .js files in the given pattern for emojis and copies an .svg file to build/emojis from ../emojitwo/svg per each emoji found
```

## SVG Emojis

* [emojitwo]
* [Noto Emoji][noto]

[emojitwo]: https://github.com/EmojiTwo/emojitwo
[noto]: https://github.com/googlei18n/noto-emoji/
