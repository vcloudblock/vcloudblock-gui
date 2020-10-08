# scratch-gui
## Installation
Before build, you should clone **scratch-vm** and **scratch-blocks** and run npm link in these folder.

```bash
git clone https://github.com/zhengyangliu/scratch-vm
git clone https://github.com/zhengyangliu/scratch-blocks
cd scratch-vm
npm install
npm link
cd ..
cd scratch-blocks
npm install
npm link
//And do some revise hand, for details plese read the README.md in scratch-blocks
```

Then link **scratch-vm scratch-blocks scratch-audio scratch-render scratch-l10n** to **scratch-gui**

```bash
npm install
npm link scratch-vm scratch-blocks scratch-audio scratch-render scratch-l10n save-svg-as-png
```
## Running
```bash
npm run start-open
```

