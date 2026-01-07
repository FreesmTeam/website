<div align="center">

<img width="160" height="160" align="center" src="https://github.com/FreesmTeam/FreesmLauncher/raw/develop/docs/favicon.webp" alt="Favicon">

<h1>
  <a style="color:#f5c2e7" href="https://new.freesmlauncher.org/">Freesm Launcher Website</a>
</h1>

<img alt="Vue.js Logo" src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D">
<img alt="UnoCSS Logo" src="https://img.shields.io/badge/unocss-333333.svg?style=for-the-badge&logo=unocss&logoColor=white">


<p><!-- To add some space between badges and text --></p>

<p>
A Prism Launcher fork that <strong>removes offline account restrictions</strong>, adds custom auth server support, and provides more customization
</p>

<p>
This fork is <strong>not</strong> endorsed by Prism Launcher
</p>

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

If you want to add a new locale:

- use [ISO 639-1](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_ISO_639-1) code names
- create `your-lang-code.json` file in `public/translations/` and fill the translations & info
- add `your-lang-code` data in `src/constants/locales.ts`
- the English translations are located in `src/locales/en.json` (also read the README file in that folder)

### Building

```shell
git clone https://github.com/FreesmTeam/website
bun i
bun dev
```

### Repositories

[![repo-card]](https://github.com/freesmteam/freesmlauncher)

<!--
### Credits

Thank you to all the people who have contributed!

<a href="https://github.com/freesmteam/website/graphs/contributors">
  <img alt="Freesm Launcher website contributors" src="https://contrib.rocks/image?repo=freesmteam/website" width="64"/>
</a>
-->

## License

<a href="./LICENSE">
  <img src="https://img.shields.io/github/license/freesmteam/website?label=License&logo=gnu&color=C4282D&style=for-the-badge" alt="License">
</a>

</div>

<!-- Variables -->

[repo-card]: https://github-readme-stats.vercel.app/api/pin/?username=freesmteam&repo=freesmlauncher&bg_color=0c0c13&text_color=ffffff&title_color=f5c2e7&icon_color=f5c2e7&border_radius=8&hide_border=true
