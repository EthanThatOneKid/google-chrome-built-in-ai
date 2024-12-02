# google-chrome-built-in-ai

## Development

Install Deno: <https://docs.deno.com/runtime/>

Run the build command:

```sh
deno task build
```

Format the source code:

```sh
deno fmt
```

Run the linter:

```sh
deno lint
```

Load the unpacked extension in Google Chrome:

1. Open the Extension Management page by navigating to `chrome://extensions`.
   - The Extension Management page can also be opened by clicking on the Chrome
     menu, hovering over `More Tools` then selecting `Extensions`.
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the `Load unpacked` button and select the extension directory.

---

Built with <3 for the
[Google Chrome Built-in AI Challenge](https://googlechromeai.devpost.com/) by
[**@EthanThatOneKid**](https://etok.codes/)
