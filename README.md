# react-native-GCore
a react-native app on iOS and android

运行平台: iOS & Android

GCore基于机核app进行开发，只做学习不做商业用途，开发基于redux架构，适配Android和iOS，因react-native自身架构还有很多难处理，UI已经尽量和原版APP匹配，但是还是有不少妥协，
而Android部分UI和功能仍有些许缺陷，如有更好方案希望提出issues一起改进和学习。

##  部分截图
![pictureOne](https://github.com/LeonHwa/react-native-GCore/blob/master/screenShot/pic1.png)
![pictureTwo](https://github.com/LeonHwa/react-native-GCore/blob/master/screenShot/pic2.png)


##  已完成功能
可以登陆注册，进行评论，订阅和收藏喜欢的栏目，简单的下拉刷新，webView与RN交互，音频下载及本地播放

## 仍需改进
- [ ] 第三方登陆
- [ ] 安卓下载音频时UI卡顿
- [ ] 删除评论功能

##  运行
```
$ git clone https://github.com/LeonHwa/react-native-GCore.git
$ cd react-native-GCore
$ npm install
$ react-native run-ios/run-android
```

## 框架
[react-redux](https://github.com/reactjs/react-redux) 

[react-native-webview-bridge](https://github.com/alinz/react-native-webview-bridge)

[react-native-audio-streaming](https://github.com/tlenclos/react-native-audio-streaming)

[react-native-audio-streamer](https://github.com/indiecastfm/react-native-audio-streamer)

[react-native-fs](https://github.com/itinance/react-native-fs)
