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

Than link  **scratch-vm** and **scratch-blocks** to **scratch-gui**

```bash
npm link scratch-vm scratch-blocks
npm install
```
## Running
```bash
npm run start-open
```