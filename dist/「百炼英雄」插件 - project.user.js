// ==UserScript==
// @name         「百炼英雄」插件 - project
// @namespace    zzliux/TemperedHeroes-Plugin
// @version      1.1.5
// @author       zzliux
// @description  百炼英雄辅助，支持抽卡、打肉、打金币、打副本、挂机领宝箱
// @icon         https://www.google.com/s2/favicons?sz=64&domain=boomegg.cn
// @homepageURL  https://github.com/zzliux/TemperedHeroes-Plugin-TampermonkeyScript
// @supportURL   https://github.com/zzliux/TemperedHeroes-Plugin-TampermonkeyScript/issues
// @downloadURL  https://github.com/zzliux/TemperedHeroes-Plugin-TampermonkeyScript/raw/refs/heads/main/dist/%E3%80%8C%E7%99%BE%E7%82%BC%E8%8B%B1%E9%9B%84%E3%80%8D%E6%8F%92%E4%BB%B6%20-%20project.user.js
// @updateURL    https://github.com/zzliux/TemperedHeroes-Plugin-TampermonkeyScript/raw/refs/heads/main/dist/%E3%80%8C%E7%99%BE%E7%82%BC%E8%8B%B1%E9%9B%84%E3%80%8D%E6%8F%92%E4%BB%B6%20-%20project.user.js
// @match        https://mprogram.boomegg.cn/box/game/wx77200645d1c7f35f/h5?appid=wx77200645d1c7f35f&game_platform=h5
// @require      https://registry.npmmirror.com/vue/3.5.13/files/dist/vue.global.prod.js
// @require      data:application/javascript,%3Bwindow.Vue%3DVue%3B
// @require      https://registry.npmmirror.com/element-plus/2.9.7/files/dist/index.full.min.js
// @require      https://registry.npmmirror.com/echarts/5.6.0/files/dist/echarts.js
// @require      https://registry.npmmirror.com/sortablejs/1.15.6/files/Sortable.min.js
// @resource     element-plus/dist/index.css  https://registry.npmmirror.com/element-plus/2.9.7/files/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const e=document.createElement("style");e.textContent=t,document.head.append(e)})(" .bet-card-log .el-dialog__footer,.bet-card-log .el-dialog__header{padding-top:0!important;padding-bottom:0!important}.setting-dialog-select .el-select-dropdown__item{text-align:left!important}.importLogContainer .el-textarea__inner{height:100%}.group[data-v-fbcb57d2]{width:max-content;margin-bottom:4px;float:right}.importLogContainer[data-v-fbcb57d2],.bet-card-log pre[data-v-fbcb57d2]{overflow:auto;height:calc(85vh - 260px);text-align:left;font-size:12px}.statisticsContainer[data-v-fbcb57d2]{overflow-x:hidden;height:calc(85vh - 214px);text-align:left}.setting-dialog .el-dialog__footer{padding-top:0!important;padding-bottom:0!important}.group[data-v-ff7011a8]{width:max-content;margin-bottom:4px;float:right}.dialog-content{display:flex;flex-direction:column;max-height:60vh}.settings-list{overflow-y:auto;flex:1;padding-right:8px}.setting-item{display:flex;align-items:center;margin-bottom:1px;padding:2px;background:#f5f7fa;border-radius:4px}.drag-handle{cursor:move;margin-right:10px;padding:0 8px;color:#909399}.name-text{margin:0 10px;text-align:left}.dynamic-btn-form-item{margin-bottom:10px}@media (max-width: 768px){.dialog-content{max-height:calc(100vh - 120px)}.setting-item{flex-wrap:wrap}}.path-viewer.el-dialog{padding:0;margin-right:0;pointer-events:auto}.path-viewer .el-dialog__header,.path-viewer .el-dialog__footer{padding:0}.path-viewer .el-dialog__headerbtn{width:22.5px;height:22.5px}.path-viewer-modal{pointer-events:none}.group[data-v-ee34aa69]{width:max-content;margin-bottom:4px;float:right}.zz-float-btn[data-v-ee34aa69]{position:fixed;bottom:10px;right:10px;width:30px;height:30px;border-radius:50%;background:#ff4757;color:#fff;border:0;cursor:pointer;font-size:18px;box-shadow:0 4px 12px #0003;transition:.3s;z-index:3001;outline:none;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;line-height:27px}.zz-sub-btns[data-v-ee34aa69]{position:fixed;bottom:40px;right:10px;opacity:0;transition:.3s;pointer-events:none;display:block;width:min-content;z-index:3001}.zz-sub-btns>button[data-v-ee34aa69]{margin-bottom:4px;float:right}.zz-show .zz-sub-btns[data-v-ee34aa69]{opacity:1;pointer-events:all}.zz-rotate[data-v-ee34aa69]{transform:rotate(45deg)!important} ");

(function (vue, ElementPlus, echarts, Sortable) {
  'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const echarts__namespace = /*#__PURE__*/_interopNamespaceDefault(echarts);

  const cssLoader = (e) => {
    const t = GM_getResourceText(e);
    return GM_addStyle(t), t;
  };
  cssLoader("element-plus/dist/index.css");
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const heroesList = [
    { id: "81002", name: "莉莉", quality: "蓝" },
    { id: "81003", name: "布莱恩", quality: "灰" },
    { id: "82001", name: "杰克", quality: "蓝" },
    { id: "82002", name: "罗宾汉", quality: "蓝" },
    { id: "82003", name: "波派", quality: "蓝" },
    { id: "82005", name: "莱特宁", quality: "橙" },
    { id: "82006", name: "哈桑", quality: "蓝" },
    { id: "82007", name: "温蕾萨", quality: "蓝" },
    { id: "83001", name: "德古拉", quality: "橙" },
    { id: "83002", name: "克里冈", quality: "紫" },
    { id: "83003", name: "王昭君", quality: "橙" },
    { id: "83004", name: "奈辛瓦里", quality: "紫" },
    { id: "83006", name: "玛丽亚", quality: "紫" },
    { id: "83008", name: "麦克雷", quality: "紫" },
    { id: "83009", name: "克劳德", quality: "紫" },
    { id: "83011", name: "海森堡", quality: "紫" },
    { id: "83012", name: "洁萝露尔", quality: "紫" },
    { id: "83013", name: "狂鼠", quality: "紫" },
    { id: "83014", name: "蒙特祖马", quality: "紫" },
    { id: "83015", name: "阿宝", quality: "橙" },
    { id: "83017", name: "佐罗", quality: "紫" },
    { id: "83019", name: "弗罗斯特", quality: "紫" },
    { id: "83020", name: "奎托斯", quality: "紫" },
    { id: "83021", name: "琪琪", quality: "紫" },
    { id: "83022", name: "埃里克", quality: "紫" },
    { id: "83023", name: "拉格纳", quality: "紫" },
    { id: "83031", name: "吉尔", quality: "橙" },
    { id: "84001", name: "宫本武藏", quality: "橙" },
    { id: "84003", name: "亚瑟", quality: "橙" },
    { id: "84004", name: "阿狸", quality: "橙" },
    { id: "84005", name: "缘壹", quality: "橙" },
    { id: "84007", name: "熬丙", quality: "红" },
    { id: "84008", name: "雅丽娜", quality: "红" },
    { id: "84009", name: "拉斐尔", quality: "橙" },
    { id: "84011", name: "谢必安", quality: "橙" },
    { id: "84013", name: "乌瑟尔", quality: "红" },
    { id: "84014", name: "莉娜", quality: "橙" },
    { id: "84015", name: "阿萨斯", quality: "橙" },
    { id: "84016", name: "卡卡西", quality: "红" },
    { id: "84017", name: "达斯坦", quality: "红" },
    { id: "84018", name: "杜康", quality: "红" },
    { id: "84019", name: "甘道夫", quality: "橙" },
    { id: "84020", name: "维多利亚", quality: "橙" },
    { id: "84021", name: "威尔海姆", quality: "橙" },
    { id: "84022", name: "阿帕奇", quality: "紫" },
    { id: "84023", name: "嫦娥", quality: "橙" },
    { id: "84024", name: "一眉", quality: "橙" },
    { id: "84025", name: "塔纳托斯", quality: "橙" },
    { id: "84026", name: "戴维琼斯", quality: "橙" },
    { id: "84027", name: "美杜莎", quality: "橙" },
    { id: "84028", name: "塔拉萨", quality: "橙" },
    { id: "84029", name: "花木兰", quality: "红" },
    { id: "84030", name: "斯卡哈", quality: "橙" },
    { id: "85001", name: "李白", quality: "红" },
    { id: "85002", name: "玛法里奥", quality: "红" },
    { id: "85003", name: "孙悟空", quality: "红" },
    { id: "85004", name: "哪吒", quality: "红" },
    { id: "85007", name: "吕布", quality: "红" },
    { id: "85008", name: "关羽", quality: "白金" },
    { id: "85009", name: "诸葛亮", quality: "红" },
    { id: "85010", name: "孙尚香", quality: "红" },
    { id: "85012", name: "阿扎尔", quality: "红" },
    { id: "85015", name: "后羿", quality: "红" },
    { id: "85016", name: "贞德", quality: "红" },
    { id: "85019", name: "妮露", quality: "橙" },
    { id: "85020", name: "宙斯", quality: "红" },
    { id: "85021", name: "紫霞", quality: "橙" },
    { id: "85022", name: "芬里尔", quality: "红" },
    { id: "85026", name: "黄飞虎", quality: "橙" },
    { id: "85027", name: "阿卡多", quality: "红" },
    { id: "85028", name: "白", quality: "橙" },
    { id: "85029", name: "莉莎", quality: "红" },
    { id: "85031", name: "闻仲", quality: "红" },
    { id: "85041", name: "嬴政", quality: "红" },
    { id: "86001", name: "姜尚", quality: "白金" },
    { id: "83029", name: "银发", quality: "橙" }
  ];
  const heroesIdMap = {};
  heroesList.forEach((hero) => heroesIdMap[hero.id] = hero);
  const heroesTreeSelectData = ["灰", "蓝", "紫", "橙", "红", "白金"].map((quality) => {
    return {
      value: `quality:${quality}`,
      label: `品阶:${quality}`,
      children: heroesList.filter((hero) => hero.quality === quality).map((hero) => {
        return {
          value: `id:${hero.id}`,
          label: `名称:${hero.name}`
        };
      })
    };
  });
  function isBasicPathNode(node) {
    return !("type" in node);
  }
  function throttle(fn, delay2) {
    let lastCall = 0;
    let pendingCall = null;
    let timeoutId2 = null;
    return function(...args) {
      const now = Date.now();
      const elapsed = now - lastCall;
      if (elapsed >= delay2) {
        lastCall = now;
        return fn.apply(this, args);
      } else {
        pendingCall = { args, thisArg: this };
        if (!timeoutId2) {
          timeoutId2 = window.setTimeout(() => {
            if (pendingCall) {
              lastCall = Date.now();
              fn.apply(pendingCall.thisArg, pendingCall.args);
              pendingCall = null;
            }
            timeoutId2 = null;
          }, delay2 - elapsed);
        }
      }
    };
  }
  const shown = vue.ref(false);
  const echartsRef = vue.ref();
  let instance = null;
  const showPathViewer = async () => {
    shown.value = true;
    await vue.nextTick();
    instance = echarts__namespace.init(echartsRef.value);
    instance.setOption({
      tooltip: {
        trigger: "item",
        formatter: function(params) {
          if (params.seriesName === "路径") {
            return `(${Math.floor(params.data[0])}, ${Math.floor(params.data[1])})`;
          } else if (params.seriesName === "当前位置") {
            return `(${Math.floor(params.data[0])}, ${Math.floor(params.data[1])})`;
          }
          return params.name;
        }
      },
      xAxis: {
        show: false,
        min: "dataMin",
        max: "dataMax"
      },
      yAxis: {
        show: false,
        min: "dataMin",
        max: "dataMax"
      },
      grid: {
        left: "10px",
        top: "10px",
        right: "10px",
        bottom: "10px"
      },
      series: []
    });
  };
  let cachedSeriesData = [];
  const setPathViewerPositionRaw = async (position) => {
    const id = cachedSeriesData.findIndex((s) => s.name === "当前位置");
    if (id !== -1) {
      cachedSeriesData[id].data = [[position.x, position.y]];
    } else {
      cachedSeriesData.push({
        name: "当前位置",
        type: "scatter",
        data: [[position.x, position.y]],
        symbol: "pin",
        symbolSize: 50,
        itemStyle: {
          color: "#EE2222"
        },
        label: {
          show: true,
          formatter: "队",
          position: "inside",
          color: "white"
        },
        emphasis: {
          disabled: true
        }
      });
    }
    instance == null ? void 0 : instance.setOption({
      series: cachedSeriesData
    });
  };
  const setPathViewerPosition = throttle(setPathViewerPositionRaw, 200);
  const setPathViewerData = async (pathIn, position) => {
    if (!shown.value) await showPathViewer();
    if (!instance) throw Error(`echarts instance error`);
    const path = pathIn.filter(isBasicPathNode);
    cachedSeriesData = [
      {
        name: "路径",
        type: "line",
        data: path.map(({ x, y }) => [x, y]),
        symbol: "circle",
        symbolSize: 8
      },
      {
        name: "起点",
        type: "scatter",
        data: [[path[0].x, path[0].y]],
        symbol: "pin",
        symbolSize: 50,
        itemStyle: {
          color: "green"
        },
        label: {
          show: true,
          formatter: "起",
          position: "inside",
          color: "white"
        },
        emphasis: {
          disabled: true
        }
      },
      {
        name: "终点",
        type: "scatter",
        data: [[path[path.length - 1].x, path[path.length - 1].y]],
        symbol: "pin",
        symbolSize: 50,
        itemStyle: {
          color: "blue"
        },
        label: {
          show: true,
          formatter: "终",
          position: "inside",
          color: "white"
        },
        emphasis: {
          disabled: true
        }
      }
    ];
    if (position) cachedSeriesData.push({
      name: "当前位置",
      type: "scatter",
      data: [[position.x, position.y]],
      symbol: "pin",
      symbolSize: 50,
      itemStyle: {
        color: "#EE2222"
      },
      label: {
        show: true,
        formatter: "队",
        position: "inside",
        color: "white"
      },
      emphasis: {
        disabled: true
      }
    });
    instance.setOption({
      series: cachedSeriesData
    });
  };
  window.showPathViewer = showPathViewer;
  window.setPathViewerData = setPathViewerData;
  let csl;
  let iframe = document.getElementById("zz-iframe-console");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "zz-iframe-console";
    document.body.appendChild(iframe);
    const contentWindow = iframe.contentWindow;
    if (!contentWindow) throw new Error("contentWindow not found");
    csl = contentWindow.console;
    iframe.style.display = "none";
  } else {
    if (!iframe.contentWindow) throw new Error("iframe.contentWindow not found");
    csl = iframe.contentWindow.console;
  }
  _unsafeWindow.csl = csl;
  (async () => {
    var _a, _b;
    if (/mobile.+safari/ig.test(navigator.userAgent)) {
      const dom = await waitForDom('img[src="https://ad-static.boomegg.cn/operation/image/IOS引导图.png"]');
      if (dom) {
        csl.log("检测到引导图，移除引导图");
        (_b = (_a = dom.parentElement) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.remove();
      }
    }
  })();
  function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful) {
          console.log("复制成功");
          resolve();
        } else {
          throw new Error("复制命令执行失败");
        }
      } catch (err) {
        document.body.removeChild(textarea);
        console.error("无法复制文本: ", err);
        reject(err);
      }
    });
  }
  _unsafeWindow.copyToClipboard = copyToClipboard;
  async function waitForDom(str, timeout) {
    timeout = timeout || 3e4;
    const stime = Date.now();
    while (Date.now() <= stime + timeout) {
      const dom = document.querySelector(str);
      if (dom) {
        return dom;
      }
      await delay(200);
    }
    return null;
  }
  _unsafeWindow.waitForDom = waitForDom;
  function getUIDomPosition(targetNode) {
    var _a;
    const uiTransform = targetNode.getComponent(_unsafeWindow.cc.UITransformComponent);
    if (!uiTransform) throw new Error("uiTransform not found");
    const worldPos = targetNode.worldPosition;
    const { width, height } = uiTransform.contentSize;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const topLeft = new _unsafeWindow.cc.Vec3(worldPos.x - halfWidth, worldPos.y + halfHeight, worldPos.z);
    const bottomRight = new _unsafeWindow.cc.Vec3(worldPos.x + halfWidth, worldPos.y - halfHeight, worldPos.z);
    const camera = (_a = _unsafeWindow.cc.find("Root/UIScene/UICamera")) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.Camera);
    if (!camera) throw new Error("camera not found");
    const screenTopLeft = camera.worldToScreen(topLeft);
    const screenBottomRight = camera.worldToScreen(bottomRight);
    const domCanvas = document.querySelector("#GameCanvas");
    if (!domCanvas) throw new Error("domCanvas not found");
    const canvasRect = domCanvas.getBoundingClientRect();
    const domScaleX = canvasRect.width / domCanvas.width;
    const domScaleY = canvasRect.height / domCanvas.height;
    const domLeft = screenTopLeft.x * domScaleX;
    const domTop = (domCanvas.height - screenTopLeft.y) * domScaleY;
    const domRight = screenBottomRight.x * domScaleX;
    const domBottom = (domCanvas.height - screenBottomRight.y) * domScaleY;
    return {
      x: canvasRect.left + domLeft,
      y: canvasRect.top + domTop,
      width: domRight - domLeft,
      height: domBottom - domTop
    };
  }
  _unsafeWindow.getUIDomPosition = getUIDomPosition;
  let debugDiv = null;
  let timeoutId = null;
  function updateDebugRect(rect, timeout) {
    timeout = timeout || 0;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (!debugDiv) {
      debugDiv = document.createElement("div");
      debugDiv.style.cssText = `
        position: absolute;
        border: 2px solid red;
        pointer-events: none;
        z-index: 9999;
    `;
      document.body.appendChild(debugDiv);
    }
    debugDiv.style.left = rect.x + "px";
    debugDiv.style.top = rect.y + "px";
    debugDiv.style.width = Math.floor(rect.width - 4) + "px";
    debugDiv.style.height = Math.floor(rect.height - 4) + "px";
    debugDiv.style.display = "block";
    if (timeout > 0) {
      timeoutId = setTimeout(() => {
        if (debugDiv) debugDiv.style.display = "none";
        timeoutId = null;
      }, timeout);
    }
  }
  _unsafeWindow.updateDebugRect = updateDebugRect;
  async function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }
  _unsafeWindow.delay = delay;
  async function waitForNodeActive(path, scaleFlag, timeout) {
    scaleFlag = scaleFlag || false;
    timeout = timeout || 3e4;
    const t1 = Date.now();
    do {
      const node = ccFind(path);
      if (node) {
        if (node.active && node.activeInHierarchy) {
          if (scaleFlag) {
            if (node.scale.x === 1 && node.scale.y === 1) {
              return node;
            }
          } else {
            return node;
          }
        }
      }
      await delay(20);
    } while (Date.now() < t1 + timeout);
    throw new Error(`find path: [${path}] timeout in ${timeout}ms`);
  }
  _unsafeWindow.waitForNodeActive = waitForNodeActive;
  function random(num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
  }
  _unsafeWindow.random = random;
  async function nodePress(node, timeout) {
    const rect = getUIDomPosition(node);
    await rectPress(rect, timeout);
  }
  _unsafeWindow.nodePress = nodePress;
  async function rectPress(rect, timeout) {
    timeout = timeout || random(100, 300);
    updateDebugRect(rect, timeout);
    const x = random(rect.x + rect.width / 4, rect.x + rect.width * 3 / 4);
    const y = random(rect.y + rect.height / 4, rect.y + rect.height * 3 / 4);
    const eventDown2 = new MouseEvent("mousedown", {
      clientX: x,
      clientY: y
    });
    const canvasDom2 = document.querySelector("#GameCanvas");
    canvasDom2 == null ? void 0 : canvasDom2.dispatchEvent(eventDown2);
    await delay(timeout);
    const eventUp2 = new MouseEvent("mouseup", {
      clientX: x,
      clientY: y
    });
    canvasDom2 == null ? void 0 : canvasDom2.dispatchEvent(eventUp2);
    await delay(timeout);
  }
  _unsafeWindow.rectPress = rectPress;
  async function nodeEventPress(node, timeout) {
    timeout = timeout || random(100, 300);
    const rect = getUIDomPosition(node);
    updateDebugRect(rect, timeout);
    node.emit(_unsafeWindow.cc.Node.EventType.TOUCH_START);
    await delay(timeout);
    node.emit(_unsafeWindow.cc.Node.EventType.TOUCH_END);
    await delay(timeout);
  }
  _unsafeWindow.nodeEventPress = nodeEventPress;
  function ccFind(path, node) {
    if (!node) node = _unsafeWindow.cc.director.getScene();
    const parts = path.split("/");
    let currentNode = node;
    for (const part of parts) {
      if (!currentNode) break;
      const match = part.match(/(.+?)(?:\[(\d+)\])?$/);
      if (!match) continue;
      const nodeName = match[1];
      const index = match[2] ? parseInt(match[2], 10) : -1;
      const children = currentNode.children;
      let targetNode = null;
      if (index >= 0) {
        const sameNameNodes = children.filter((child) => child.name === nodeName);
        if (index < sameNameNodes.length) {
          targetNode = sameNameNodes[index];
        } else {
          csl.error(`[findWithIndex] 索引超出范围：${nodeName}[${index}]`);
          return null;
        }
      } else {
        targetNode = currentNode.getChildByName(nodeName);
      }
      currentNode = targetNode;
    }
    return currentNode;
  }
  _unsafeWindow.ccFind = ccFind;
  function planPath(myPosition, monsters) {
    const clusters = clusterMonsters(monsters, 300);
    return findShortestPath(myPosition, clusters);
  }
  _unsafeWindow.planPath = planPath;
  function clusterMonsters(monsters, radius) {
    if (monsters.length === 0) return [];
    const visited = new Array(monsters.length).fill(false);
    const clusters = [];
    for (let i = 0; i < monsters.length; i++) {
      if (visited[i]) continue;
      const cluster = [];
      const queue = [i];
      while (queue.length > 0) {
        const current = queue.shift();
        if (visited[current]) continue;
        visited[current] = true;
        cluster.push(monsters[current]);
        for (let j = 0; j < monsters.length; j++) {
          if (!visited[j] && distance(monsters[current], monsters[j]) <= radius) {
            queue.push(j);
          }
        }
      }
      clusters.push(cluster);
    }
    const centers = clusters.map((cluster) => {
      let sumX = 0, sumY = 0;
      cluster.forEach((monster) => {
        sumX += monster.x;
        sumY += monster.y;
      });
      return {
        x: sumX / cluster.length,
        y: sumY / cluster.length
      };
    });
    return centers;
  }
  _unsafeWindow.clusterMonsters = clusterMonsters;
  function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }
  function pointToLineDistance(point, lineStart, lineEnd) {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) {
      param = dot / len_sq;
    }
    let xx, yy;
    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }
    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }
  function findShortestPath(start2, points) {
    if (points.length === 0) return [];
    const path = [start2];
    const unvisited = [...points];
    while (unvisited.length > 0) {
      const last = path[path.length - 1];
      let nearestIndex = 0;
      let minDist = distance(last, unvisited[0]);
      for (let i = 1; i < unvisited.length; i++) {
        const dist = distance(last, unvisited[i]);
        if (dist < minDist) {
          minDist = dist;
          nearestIndex = i;
        }
      }
      path.push(unvisited[nearestIndex]);
      unvisited.splice(nearestIndex, 1);
    }
    return path.slice(1);
  }
  function pauseAnimations(node) {
    const animations = node.getComponentsInChildren(_unsafeWindow.cc.Animation);
    animations.forEach((anim) => anim.pause());
  }
  function resumeAnimations(node) {
    const animations = node.getComponentsInChildren(_unsafeWindow.cc.Animation);
    animations.forEach((anim) => anim.resume());
  }
  function getBetCardHeroQuality() {
    var _a, _b, _c, _d;
    const idName = heroesIdMap;
    const ret = [];
    for (let i = 1; i <= 3; i++) {
      const str = `Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/HeroBox/hero${i}/Panel/HeroBox/PubHeroNode/Animation/Sprite`;
      const heroSpriteFrameName = (_c = (_b = (_a = ccFind(str)) == null ? void 0 : _a.getComponents(_unsafeWindow.cc.Sprite)[0]) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
      if (!heroSpriteFrameName) {
        ret.push({ id: "UNKOWN", name: "UNKOWN", quality: "UNKOWN" });
        continue;
      }
      const key = (_d = heroSpriteFrameName.match(/^Hero(\d{5})/)) == null ? void 0 : _d[1];
      if (idName[key]) {
        ret.push(idName[key]);
      } else {
        ret.push({ id: key, name: key, quality: "UNKOWN" });
      }
    }
    return ret;
  }
  _unsafeWindow.getBetCardHeroQuality = getBetCardHeroQuality;
  function getTeamPosition() {
    const teamUnit = ccFind("Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer/TeamUnit");
    if (!teamUnit) return null;
    const { x, y } = teamUnit.position;
    return { x, y };
  }
  _unsafeWindow.getTeamPosition = getTeamPosition;
  function nearBy(x, y, x2, y2) {
    if (typeof x2 === "undefined" || typeof y2 === "undefined") {
      const teamPosition = getTeamPosition();
      x2 = teamPosition.x;
      y2 = teamPosition.y;
    }
    const distance2 = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    if (distance2 < 30) return true;
    return false;
  }
  _unsafeWindow.nearBy = nearBy;
  let canvasDom;
  function initCanvasDomIfNeeded() {
    if (!canvasDom) {
      canvasDom = document.querySelector("#GameCanvas");
      if (!canvasDom) throw new Error("canvasDom not found");
    }
  }
  let moveStatus = false;
  let moveInterrupt = false;
  async function moveToXY(x, y, stuckRetryTimes = 0) {
    if (moveStatus) {
      throw new Error("正在移动，请勿重复调用");
    }
    if (nearBy(x, y)) return;
    moveStatus = true;
    initCanvasDomIfNeeded();
    const width = canvasDom.clientWidth;
    const height = canvasDom.clientHeight;
    let centerX = width / 2 + random(-25, 25), centerY = height * 3 / 4 + random(-25, 25);
    await delay(10);
    eventDown(centerX, centerY);
    await delay(10);
    const maxR = random(60, 110);
    await new Promise((resolve, reject) => {
      let lastPositions = [];
      const POSITION_HISTORY_SIZE = 5;
      let stuckCount = 0;
      const t1 = Date.now();
      const tid = setInterval(() => {
        try {
          const currentPosition = getTeamPosition();
          const distance2 = Math.sqrt(Math.pow(currentPosition.x - x, 2) + Math.pow(currentPosition.y - y, 2));
          csl.log(`当前: (${Math.round(currentPosition.x)}, ${Math.round(currentPosition.y)}), 目标: (${Math.round(x)}, ${Math.round(y)}), 距离: ${Math.round(distance2)}`);
          setPathViewerPosition(currentPosition);
          lastPositions.push({ x: Math.floor(currentPosition.x), y: Math.floor(currentPosition.y) });
          if (lastPositions.length > POSITION_HISTORY_SIZE) {
            lastPositions.shift();
          }
          const offsetXOrigin = x - currentPosition.x;
          const offsetYOrigin = currentPosition.y - y;
          const rOrigion = Math.sqrt(offsetXOrigin * offsetXOrigin + offsetYOrigin * offsetYOrigin);
          const offsetX = offsetXOrigin / rOrigion * maxR;
          const offsetY = offsetYOrigin / rOrigion * maxR;
          const currentX = Math.round(centerX + offsetX);
          const currentY = Math.round(centerY + offsetY);
          if (Date.now() - t1 > 10 * 1e3) {
            clearInterval(tid);
            eventUp(currentX, currentY);
            moveStatus = false;
            reject("moveToXY: 超时");
          }
          if (moveInterrupt) {
            clearInterval(tid);
            eventUp(currentX, currentY);
            moveInterrupt = false;
            moveStatus = false;
            reject("中断本次移动");
          }
          eventMove(currentX, currentY);
          if (lastPositions.length === POSITION_HISTORY_SIZE) {
            const uniquePositions = new Set(lastPositions.map((p) => `${p.x},${p.y}`));
            if (uniquePositions.size <= 2) {
              stuckCount++;
            } else {
              stuckCount = 0;
            }
            if (stuckCount >= 5) {
              clearInterval(tid);
              eventUp(currentX, currentY);
              moveStatus = false;
              if (stuckRetryTimes >= 3) {
                reject("moveToXY: 卡住了，出不来");
              } else {
                csl.log(`moveToXY: 似乎卡住了，准备重试`);
                setTimeout(() => {
                  moveToXY(x, y, stuckRetryTimes + 1).then(resolve).catch(reject);
                }, 800);
              }
            }
          }
          if (nearBy(x, y)) {
            clearInterval(tid);
            eventUp(currentX, currentY);
            resolve();
          }
        } catch (e) {
          clearInterval(tid);
          moveStatus = false;
          reject(e);
        }
      }, 100);
    });
    moveStatus = false;
  }
  function eventDown(x, y) {
    initCanvasDomIfNeeded();
    const eventDown2 = new MouseEvent("mousedown", {
      clientX: x,
      clientY: y
    });
    canvasDom.dispatchEvent(eventDown2);
    updateDebugRect({ x: x - 4, y: y - 4, width: 7, height: 7 }, 102);
  }
  function eventMove(x, y) {
    initCanvasDomIfNeeded();
    const eventMove2 = new MouseEvent("mousemove", {
      clientX: x,
      clientY: y
    });
    canvasDom.dispatchEvent(eventMove2);
    updateDebugRect({ x: x - 4, y: y - 4, width: 7, height: 7 }, 102);
  }
  function eventUp(x, y) {
    initCanvasDomIfNeeded();
    const eventUp2 = new MouseEvent("mouseup", {
      clientX: x,
      clientY: y
    });
    canvasDom.dispatchEvent(eventUp2);
    updateDebugRect({ x: x - 4, y: y - 4, width: 7, height: 7 }, 102);
  }
  _unsafeWindow.moveToXY = moveToXY;
  async function teleport(info) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const rect = getNearestMagnifierRect();
    if (moveInterrupt) {
      moveInterrupt = false;
      throw Error(`点击中断`);
    }
    await rectPress(rect);
    let step1Str = null;
    if (info.target[0] === "英雄大陆") {
      step1Str = `Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/TabPanel/TabPageBtn1`;
    } else if (info.target[0] === "无尽深渊") {
      step1Str = `Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/TabPanel/TabPageBtn2`;
    }
    if (!step1Str) throw Error(`${info.target[0]} is not valid value`);
    await delay(200);
    const step1Node = await waitForNodeActive(step1Str, true, 3e3);
    if (moveInterrupt) {
      moveInterrupt = false;
      throw Error(`点击中断`);
    }
    await nodePress(step1Node);
    let step2ContainerStr = null;
    if (info.target[0] === "英雄大陆") {
      step2ContainerStr = "Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/Panel/Panel1/PlaceScrollView/view/content";
    } else if (info.target[0] === "无尽深渊") {
      step2ContainerStr = "Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/Panel/Panel2/PlaceScrollView/view/content";
    }
    let step2Node = (_a = ccFind(step2ContainerStr)) == null ? void 0 : _a.children.find((node) => {
      const labelNode = ccFind("PlaceName", node);
      if (!labelNode) return false;
      const labelName = labelNode.getComponent(_unsafeWindow.cc.Label).string;
      return labelName === info.target[1];
    });
    if (info.target[0] === "无尽深渊" && !step2Node) {
      const items = (_b = ccFind(step2ContainerStr)) == null ? void 0 : _b.children;
      const rect2 = getUIDomPosition(items[items.length - 2]);
      const p = {
        x: rect2.x + rect2.width / 2,
        y: rect2.y + rect2.height / 2
      };
      if (moveInterrupt) {
        moveInterrupt = false;
        throw Error(`点击中断`);
      }
      eventDown(p.x, p.y);
      await delay(200);
      eventMove(p.x, Math.max(p.y - 500, 1));
      await delay(500);
      eventUp(p.x, Math.max(p.y - 500, 1));
      await delay(500);
      step2Node = (_c = ccFind(step2ContainerStr)) == null ? void 0 : _c.children.find((node) => {
        const labelNode = ccFind("PlaceName", node);
        if (!labelNode) return false;
        const labelName = labelNode.getComponent(_unsafeWindow.cc.Label).string;
        return labelName === info.target[1];
      });
    }
    if (!step2Node) throw Error(`${info.target[1]} is not valid value`);
    if (moveInterrupt) {
      moveInterrupt = false;
      throw Error(`点击中断`);
    }
    await nodeEventPress(step2Node);
    await delay(500);
    let step3ContainerStr = null;
    if (info.target[0] === "英雄大陆") {
      step3ContainerStr = "Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/Panel/Panel1/TeleportScrollView/view/content";
    } else if (info.target[0] === "无尽深渊") {
      step3ContainerStr = "Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/Panel/Panel2/TeleportScrollView/view/content";
    }
    let step3items = (_d = ccFind(step3ContainerStr)) == null ? void 0 : _d.children.sort((a, b) => b.worldPosition.y - a.worldPosition.y);
    if (!step3items) throw Error(`${info.target[2]} is not valid value[1]`);
    let step3Node = step3items.find((node) => {
      const labelNode = ccFind("Name", node);
      const labelName = labelNode == null ? void 0 : labelNode.getComponent(_unsafeWindow.cc.Label).string;
      return labelName === info.target[2];
    });
    if (!step3Node) {
      if (step3items.length < 6) throw Error(`${info.target[2]} is not valid value[2]`);
      let flag = true;
      while (flag) {
        const rectStart = getUIDomPosition(step3items[step3items.length - 2]);
        const p1 = {
          x: Math.floor(rectStart.x + rectStart.width / 2),
          y: Math.floor(rectStart.y + rectStart.height / 2)
        };
        const rectEnd = getUIDomPosition(step3items[0]);
        const p2 = {
          x: rectEnd.x + rectEnd.width / 2,
          y: rectEnd.y + rectEnd.height / 2
        };
        csl.log(`右侧翻页`);
        if (moveInterrupt) {
          moveInterrupt = false;
          throw Error(`点击中断`);
        }
        eventDown(p1.x, p1.y);
        await delay(500);
        eventMove(p2.x, p2.y);
        await delay(500);
        eventUp(p2.x, p2.y);
        await delay(500);
        const lastLabelName = (_f = (_e = ccFind("Name", step3items[step3items.length - 1])) == null ? void 0 : _e.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _f.string;
        step3items = (_g = ccFind(step3ContainerStr)) == null ? void 0 : _g.children.sort((a, b) => b.worldPosition.y - a.worldPosition.y);
        step3Node = step3items.find((node) => {
          const labelNode = ccFind("Name", node);
          const labelName = labelNode == null ? void 0 : labelNode.getComponent(_unsafeWindow.cc.Label).string;
          return labelName === info.target[2];
        });
        if (step3Node) break;
        const lastLabelNameNew = (_i = (_h = ccFind("Name", step3items[step3items.length - 1])) == null ? void 0 : _h.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _i.string;
        if (lastLabelName === lastLabelNameNew) {
          flag = false;
          csl.error("翻到最后了，没有找到");
          break;
        }
      }
    }
    if (!step3Node) throw Error(`${info.target[2]} is not valid value[3]`);
    let lastPosition = getTeamPosition();
    lastPosition.x = Math.floor(lastPosition.x);
    lastPosition.y = Math.floor(lastPosition.y);
    if (moveInterrupt) {
      moveInterrupt = false;
      throw Error(`点击中断`);
    }
    await nodeEventPress(step3Node);
    await delay(500);
    const t1 = Date.now();
    while (Date.now() - t1 > 3e4) {
      await delay(500);
      const newPosition = getTeamPosition();
      if (!newPosition) continue;
      newPosition.x = Math.floor(newPosition.x);
      newPosition.y = Math.floor(newPosition.y);
      if (newPosition.x !== lastPosition.x || newPosition.y !== lastPosition.y) {
        break;
      }
    }
    if (moveInterrupt) {
      moveInterrupt = false;
      throw Error(`点击中断`);
    }
    await waitForNodeActive("Root/GameScene/OperationCanvas/MapButtonView/BuildingButton01");
    await delay(200);
  }
  _unsafeWindow.teleport = teleport;
  async function movePath(path, isCircle = false) {
    if (path.length < 2) {
      throw new Error("路径至少需要2个点");
    }
    const currentPos = getTeamPosition();
    if (!currentPos) {
      throw new Error("无法获取当前位置");
    }
    const { segmentIndex: closestSegmentIndex, minDistance } = getPathStartIndex(currentPos, path);
    let startIndex = closestSegmentIndex + 1;
    if (minDistance > 3e3) startIndex = 0;
    setPathViewerData(getPathViewData(startIndex, path));
    for (let i = startIndex; i < path.length; i = isCircle ? (i + 1) % path.length : i + 1) {
      const node = path[i];
      setPathViewerData(getPathViewData(i, path));
      if (isBasicPathNode(node)) {
        await moveToXY(node.x, node.y);
      } else if (node.type === "backHome") {
        await backHome();
      } else if (node.type === "teleport") {
        await teleport(node);
      }
      await waitForHerosStatus(["Idle", "Gather", "Move"]);
      await delay(200);
    }
  }
  _unsafeWindow.movePath = movePath;
  function getPathViewData(index, path) {
    let left = index;
    while (left > 0) {
      if (!isBasicPathNode(path[left])) {
        break;
      }
      left--;
    }
    let right = index;
    while (right < path.length - 1) {
      if (!isBasicPathNode(path[right])) {
        break;
      }
      right++;
    }
    return path.slice(left, right);
  }
  async function movePathWithMonster(path, statusRef, isCircle = false) {
    if (path.length < 2) {
      throw new Error("路径至少需要2个点");
    }
    while (statusRef.value) {
      const newPath = path.map((pt) => ({ ...pt }));
      const monsterPositions = ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer").children.filter((ele) => {
        var _a, _b, _c;
        if (/^Monster|^Boss/i.test(ele.name)) {
          const frameName = (_c = (_b = (_a = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
          if (frameName && !/[\-_]Die/i.test(frameName)) {
            return true;
          }
        }
        return false;
      }).map((ele) => ({ x: ele.position.x, y: ele.position.y }));
      const clusterPts = clusterMonsters(monsterPositions, 100);
      csl.log("clusterPts", clusterPts);
      clusterPts.forEach((pt) => {
        const { segmentIndex, minDistance: minDistance2 } = getPathStartIndex(pt, newPath);
        if (minDistance2 < 510 && minDistance2 > 180) {
          newPath.splice(segmentIndex + 1, 0, pt);
        } else if (minDistance2 <= 180 && segmentIndex < newPath.length - 1) {
          const node1 = newPath[segmentIndex];
          const node2 = newPath[segmentIndex + 1];
          if (!isBasicPathNode(node1) || !isBasicPathNode(node2)) return;
          const d1 = distance(pt, node1);
          const d2 = distance(pt, node2);
          if (d1 >= 180 && d2 >= 180) {
            newPath.splice(segmentIndex + 1, 0, pt);
          }
        }
      });
      const currentPos = getTeamPosition();
      const { segmentIndex: closestSegmentIndex, minDistance } = getPathStartIndex(currentPos, newPath);
      let startIndex;
      const firstNode = newPath[0];
      if (isCircle && isBasicPathNode(firstNode) && nearBy(currentPos.x, currentPos.y, firstNode.x, firstNode.y)) {
        startIndex = 1;
      } else {
        if (minDistance >= 3e3) {
          startIndex = 0;
        } else {
          startIndex = closestSegmentIndex + 1;
        }
        while (startIndex < newPath.length) {
          const currentNode = newPath[startIndex];
          if (!isBasicPathNode(currentNode)) break;
          if (!nearBy(currentPos.x, currentPos.y, currentNode.x, currentNode.y)) break;
          startIndex++;
        }
        if (isCircle && startIndex >= newPath.length) {
          startIndex = 0;
        } else if (startIndex >= newPath.length) {
          break;
        }
      }
      csl.log("path", path);
      csl.log("newPath", newPath);
      csl.log("startIndex", startIndex);
      csl.log("currentPos", currentPos);
      csl.log("nextPos", newPath[startIndex]);
      setPathViewerData(getPathViewData(startIndex, newPath));
      const node = newPath[startIndex];
      if (isBasicPathNode(node)) {
        await moveToXY(node.x, node.y);
      } else if (node.type === "backHome") {
        await backHome();
      } else if (node.type === "teleport") {
        await teleport(node);
      }
      if (!isCircle && !isBasicPathNode(node) && startIndex === newPath.length - 1) {
        break;
      }
      await waitForHerosStatus(["Idle", "Gather", "Move"]);
      await delay(200);
    }
  }
  _unsafeWindow.movePathWithMonster = movePathWithMonster;
  function isHerosStatus(status2) {
    const reg = new RegExp(status2.join("|"), "i");
    return !ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer").children.filter((ele) => {
      var _a, _b, _c;
      if (/^HeroUnit/i.test(ele.name)) {
        const frameName = (_c = (_b = (_a = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
        if (!reg.test(frameName)) {
          return true;
        }
      }
      return false;
    }).length;
  }
  async function waitForHerosStatus(status2, timeout = 15e3) {
    const t1 = Date.now();
    while (true) {
      if (moveInterrupt) {
        moveInterrupt = false;
        throw Error(`点击中断`);
      }
      let flag = false;
      const tt1 = Date.now();
      while (!flag) {
        if (!isHerosStatus(status2)) {
          break;
        }
        if (Date.now() - tt1 >= 120) {
          flag = true;
          break;
        }
        await delay(100);
      }
      if (flag) {
        csl.log(`等待英雄状态${status2}完成`);
        break;
      }
      if (Date.now() - t1 > timeout) {
        csl.error("等待英雄状态超时");
        break;
      }
      await delay(30);
    }
  }
  function getPathStartIndex(currentPos, path) {
    let minDistance = Infinity;
    let closestSegmentIndex = -1;
    for (let i = 0; i < path.length - 1; i++) {
      const node1 = path[i];
      const node2 = path[i + 1];
      if (!isBasicPathNode(node1) || !isBasicPathNode(node2)) continue;
      distance(node1, node2);
      const dist = pointToLineDistance(currentPos, node1, node2);
      if (dist < minDistance) {
        minDistance = dist;
        closestSegmentIndex = i;
      }
    }
    return { segmentIndex: closestSegmentIndex, minDistance };
  }
  _unsafeWindow.getPathStartIndex = getPathStartIndex;
  function setMoveInterrupt() {
    moveInterrupt = true;
    setTimeout(() => {
      moveInterrupt = false;
    }, 5e3);
  }
  _unsafeWindow.setMoveInterrupt = setMoveInterrupt;
  async function waitForPosition(x, y, timeout) {
    timeout = timeout || 3e4;
    const t1 = Date.now();
    do {
      try {
        if (nearBy(x, y)) {
          return true;
        }
      } catch (e) {
      }
      await delay(500);
    } while (Date.now() < t1 + timeout);
    throw new Error(`等待坐标(${Math.floor(x)}, ${Math.floor(y)})超时`);
  }
  _unsafeWindow.waitForPosition = waitForPosition;
  async function waitForPositions(arr, timeout) {
    timeout = timeout || 3e4;
    const t1 = Date.now();
    do {
      try {
        for (let i = 0; i < arr.length; i++) {
          const { x, y } = arr[i];
          if (nearBy(x, y)) {
            return i;
          }
        }
      } catch (e) {
      }
      await delay(500);
    } while (Date.now() < t1 + timeout);
    return -1;
  }
  _unsafeWindow.waitForPositions = waitForPositions;
  function getNearestMagnifierRect() {
    const gameCanvas = document.querySelector("#GameCanvas");
    const mapButtonView = ccFind("Root/GameScene/OperationCanvas/MapButtonView/");
    if (!mapButtonView) throw new Error("mapButtonView not found");
    const arr = mapButtonView.children.filter((ele) => {
      return ele.active && ele.activeInHierarchy;
    }).map((ele) => {
      const rect = getUIDomPosition(ele);
      rect.y -= rect.height / 2;
      const targetX = gameCanvas.clientWidth / 2 + rect.width / 2;
      const targetY = gameCanvas.clientHeight / 2 - rect.height * 3 / 2;
      return {
        ele,
        distance: Math.sqrt((rect.x - targetX) ** 2 + (rect.y - targetY) ** 2),
        ...rect
      };
    }).sort((a, b) => {
      return a.distance - b.distance;
    });
    if (arr && !arr.length) {
      throw new Error("未找到中心放大镜");
    }
    return arr[0];
  }
  _unsafeWindow.getNearestMagnifierRect = getNearestMagnifierRect;
  async function backHome() {
    const backHomeBtn = ccFind("Root/UIScene/UICanvas/Menu/MenuView/SaveArea/DownRight/BackHomeMenuIconView");
    if (backHomeBtn && backHomeBtn.active) {
      if (moveInterrupt) {
        moveInterrupt = false;
        throw Error(`点击中断`);
      }
      await nodePress(backHomeBtn);
      try {
        const confirmBtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/ConfirmPopup/Popup/PanelHasTitle/Panel/BtnLay/BigButtonGreen", true, 3e3);
        await delay(200);
        if (moveInterrupt) {
          moveInterrupt = false;
          throw Error(`点击中断`);
        }
        await nodePress(confirmBtn);
        await delay(200);
      } catch (e) {
        csl.error(`未找到确认按钮，可能无需确认就直接回城了`);
      }
      await waitForPosition(-7089, -5605);
      await waitForNodeActive("Root/GameScene/OperationCanvas/MapButtonView/BuildingButton01");
    } else {
      try {
        await moveToXY(-7089, -5605);
      } catch (e) {
        alert("返回城镇失败");
        throw e;
      }
    }
  }
  _unsafeWindow.backHome = backHome;
  function findNodesWithEvent(root, eventType, result = []) {
    if (root.hasEventListener(eventType)) {
      result.push(root);
    }
    const children = root.children;
    for (let i = 0; i < children.length; i++) {
      findNodesWithEvent(children[i], eventType, result);
    }
    return result;
  }
  const getAllHasTouchEventNode = () => {
    const nodesWithTouchEnd = findNodesWithEvent(_unsafeWindow.cc.director.getScene(), _unsafeWindow.cc.Node.EventType.TOUCH_END);
    return nodesWithTouchEnd;
  };
  _unsafeWindow.getAllHasTouchEventNode = getAllHasTouchEventNode;
  const printAllHasTouchEventNode = () => {
    csl.log(getAllHasTouchEventNode().map((node) => getNodePath(node)).join("\n"));
  };
  _unsafeWindow.printAllHasTouchEventNode = printAllHasTouchEventNode;
  const test = () => {
  };
  _unsafeWindow.test = test;
  function getNodePath(node) {
    let path = node.name;
    let parent = node.parent;
    while (parent) {
      path = `${parent.name}/${path}`;
      parent = parent.parent;
    }
    return path;
  }
  let arrowContainer = null;
  function clearDirectAssists() {
    if (arrowContainer) {
      arrowContainer.innerHTML = "";
    }
  }
  function setDirectAssists(points) {
    if (!arrowContainer) {
      arrowContainer = document.createElement("div");
      arrowContainer.style.cssText = `
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9998;
        `;
      document.body.appendChild(arrowContainer);
    }
    clearDirectAssists();
    points.forEach((point) => {
      const arrow = document.createElement("div");
      arrow.style.cssText = `
            position: absolute;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 30px solid rgba(255, 94, 0, 0.95);
            transform-origin: center bottom;
        `;
      const angle = Math.atan2(point.y, point.x) * 180 / Math.PI;
      arrow.style.transform = `rotate(${angle}deg) translateY(-50px)`;
      arrowContainer.appendChild(arrow);
    });
  }
  _unsafeWindow.setDirectAssists = setDirectAssists;
  _unsafeWindow.clearDirectAssists = clearDirectAssists;
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "PauseBossBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = () => {
        status2.value = !status2.value;
        csl.log(`BOSS暂停: ${status2.value ? "开" : "关"}`);
        triggerInterval();
      };
      let intervalId = null;
      const triggerInterval = () => {
        if (intervalId) return;
        intervalId = setInterval(() => {
          const unitLayer = _unsafeWindow.cc.find("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer");
          if (!unitLayer) return;
          const eles = unitLayer.children;
          eles.forEach((ele) => {
            var _a, _b, _c;
            if (/^boss/i.test(ele.name)) {
              if (status2.value) {
                const frameName = (_c = (_b = (_a = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
                if (frameName && !/[\-_]Die/i.test(frameName)) {
                  pauseAnimations(ele);
                } else {
                  resumeAnimations(ele);
                }
              } else {
                resumeAnimations(ele);
              }
            }
          });
        }, 1e3);
      };
      vue.onUnmounted(() => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status2.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" BOSS暂停: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const _sfc_main$e = /* @__PURE__ */ vue.defineComponent({
    __name: "PauseMonsterBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = () => {
        status2.value = !status2.value;
        csl.log(`小怪暂停: ${status2.value ? "开" : "关"}`);
        triggerInterval();
      };
      let intervalId = null;
      const triggerInterval = () => {
        if (intervalId) return;
        intervalId = setInterval(() => {
          const unitLayer = _unsafeWindow.cc.find("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer");
          if (!unitLayer) return;
          const eles = unitLayer.children;
          eles.forEach((ele) => {
            var _a, _b, _c;
            if (/^Monster/i.test(ele.name)) {
              if (status2.value) {
                const frameName = (_c = (_b = (_a = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
                if (frameName && !/[\-_]Die/i.test(frameName)) {
                  pauseAnimations(ele);
                } else {
                  resumeAnimations(ele);
                }
              } else {
                resumeAnimations(ele);
              }
            }
          });
        }, 1e3);
      };
      vue.onUnmounted(() => {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status2.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 小怪暂停: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const status$2 = vue.ref(false);
  const betCardLogVisiable = vue.ref(false);
  const logContent = vue.ref("");
  const logPreRef = vue.ref();
  async function waitForBetCardOnceResult() {
    const arr = [
      "Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/HeroBox/hero1/Panel/HeroBox/Ribbon_down",
      "Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/HeroBox/hero2/Panel/HeroBox/Ribbon_down",
      "Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/HeroBox/hero3/Panel/HeroBox/Ribbon_down"
    ];
    const timeout = 8e3 + Date.now();
    while (Date.now() < timeout) {
      for (let i = 0; i < arr.length; i++) {
        const node = ccFind(arr[i]);
        if (node && node.active && node.activeInHierarchy) {
          return i;
        }
      }
      await delay(200);
    }
    return -1;
  }
  const canTripleBetCard = () => {
    const hqs = getBetCardHeroQuality();
    let flag = false;
    const thirdList = _GM_getValue("betCardTripleList", []);
    for (let i = 0; i < hqs.length; i++) {
      for (let j = 0; j < thirdList.length; j++) {
        const [type, value] = thirdList[j].split(":");
        if ((type === "id" || type === "quality") && hqs[i][type] === value) {
          flag = true;
          break;
        }
      }
      if (flag) break;
    }
    return flag;
  };
  async function betCardOnce() {
    var _a;
    let count = 1;
    while (count--) {
      try {
        const noTip = ccFind("Root/UIScene/UICanvas/Top/SystemConfirmPopupView/Popup/PanelHasTitle/Panel/noTipToggle/Floor");
        const givenUpConfirmBtn = ccFind("Root/UIScene/UICanvas/Top/SystemConfirmPopupView/Popup/PanelHasTitle/Panel/BtnLay/BigButtonGreen");
        if (noTip && noTip.active && noTip.activeInHierarchy) {
          if (!status$2.value) return;
          await nodePress(noTip);
          await delay(200);
        }
        if (givenUpConfirmBtn && givenUpConfirmBtn.active && givenUpConfirmBtn.activeInHierarchy) {
          if (!status$2.value) return;
          await nodePress(givenUpConfirmBtn);
          await delay(200);
        }
        const betBtn = await waitForNodeActive("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/ButtonBox/BigButtonHasProp", true);
        const betBtnIconFrameSprite = (_a = ccFind("Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/ButtonBox/BigButtonHasProp/Img/PropNode/Icon")) == null ? void 0 : _a.getComponents(_unsafeWindow.cc.Sprite)[0];
        const betBtnIconFramePath = betBtnIconFrameSprite.targetFramePath;
        let giveUpBtn = ccFind("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/LabelBox/GiveUpButton");
        if ("System/Currency/ResourceIcon/88/spriteFrame" === betBtnIconFramePath) {
          if (giveUpBtn && (!giveUpBtn.active || !giveUpBtn.activeInHierarchy)) {
            await waitForNodeActive("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/LabelBox/GiveUpButton");
          }
        } else if ("System/Currency/ResourceIcon/1/spriteFrame" === betBtnIconFramePath) {
        } else {
          throw new Error("未知的抽卡按钮");
        }
        await delay(50);
        if (giveUpBtn && giveUpBtn.active && giveUpBtn.activeInHierarchy) {
          if (!status$2.value) return;
          await nodePress(giveUpBtn);
          csl.log("点击放弃");
          count++;
        } else {
          const flag = canTripleBetCard();
          const hqs = getBetCardHeroQuality();
          if (flag) {
            if (!status$2.value) return;
            const maxBtn = await waitForNodeActive("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/BetNode/maxButton", true);
            if (!status$2.value) return;
            if (maxBtn) await nodePress(maxBtn);
            await delay(200);
            if (!status$2.value) return;
            await nodePress(betBtn);
          } else {
            if (!status$2.value) return;
            await nodePress(betBtn);
          }
          const index = await waitForBetCardOnceResult();
          if (index !== -1) {
            let betCardLog = _GM_getValue("betCardLog", "");
            const str = `[抽卡][${flag ? "三倍" : "普通"}]	([${hqs[0].quality}][${hqs[0].name}],[${hqs[1].quality}][${hqs[1].name}],[${hqs[2].quality}][${hqs[2].name}])	抽中[${index + 1}][${hqs[index].quality}][${hqs[index].name}]`;
            csl.log(str);
            betCardLog += str + "\n";
            if (betCardLogVisiable.value && logPreRef.value) {
              logContent.value = betCardLog;
              vue.nextTick(() => {
                if (logPreRef.value) {
                  const currentScrollLeft = logPreRef.value.scrollLeft;
                  logPreRef.value.scrollTo(0, logPreRef.value.scrollHeight);
                  logPreRef.value.scrollLeft = currentScrollLeft;
                }
              });
            }
            _GM_setValue("betCardLog", betCardLog);
          }
        }
        await delay(200);
      } catch (e) {
        csl.error(e);
        await delay(200);
      }
    }
  }
  let betCardAutoRecruitFlag = true;
  const setCanBetCardAutoRecruit = () => {
    betCardAutoRecruitFlag = true;
  };
  const dealBetCardAutoRecruitResult = () => {
    var _a;
    const str = (_a = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitDisplayView/Content/rewardBg/ScrollView/view/content")) == null ? void 0 : _a.children.map((node) => {
      var _a2, _b;
      const targetFramePath = (_b = (_a2 = ccFind("Content/propItem/content/propIcon", node)) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.targetFramePath;
      const result = targetFramePath == null ? void 0 : targetFramePath.match(/HeroIcon\/(\d+?)\//);
      return (result == null ? void 0 : result[1]) || "UNKNOWN";
    }).map((id) => {
      let logStr = "";
      if (id !== "UNKNOWN") {
        const heroInfo = heroesIdMap[id];
        if (heroInfo) {
          logStr = `[抽卡][自动]	([.][.],[.][.],[.][.])	抽中[.][${heroInfo.quality}][${heroInfo.name}]`;
        } else {
          logStr = `[抽卡][自动]	([.][.],[.][.],[.][.])	抽中[.][UNKNOWN][UNKNOWN]`;
        }
      }
      return logStr;
    }).join("\n");
    let betCardLog = _GM_getValue("betCardLog", "");
    betCardLog += str + "\n";
    if (betCardLogVisiable.value && logPreRef.value) {
      logContent.value = betCardLog;
      vue.nextTick(() => {
        if (logPreRef.value) {
          const currentScrollLeft = logPreRef.value.scrollLeft;
          logPreRef.value.scrollTo(0, logPreRef.value.scrollHeight);
          logPreRef.value.scrollLeft = currentScrollLeft;
        }
      });
    }
    csl.log(str);
    _GM_setValue("betCardLog", betCardLog);
  };
  const betCardAutoRecruitOnce = async () => {
    var _a, _b, _c, _d, _e;
    if (!betCardAutoRecruitFlag) return;
    while (true) {
      if (!status$2.value) return;
      if ("符合筛选条件的英雄已经出现" === ((_b = (_a = ccFind("Root/UIScene/UICanvas/Top/ToastPopup/center/LabelToastItem/txt")) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _b.string)) {
        const closeTips = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitSettingView/Content/Popup/Bottom/CloseTips");
        if (closeTips && closeTips.active && closeTips.activeInHierarchy) {
          if (!status$2.value) return;
          await nodePress(closeTips);
          await delay(200);
          return;
        }
        await delay(200);
        return;
      }
      const BigButtonGreen = ccFind("Root/UIScene/UICanvas/Popup/ConfirmPopup/Popup/PanelHasTitle/Panel/BtnLay/BigButtonGreen");
      if (BigButtonGreen && BigButtonGreen.active && BigButtonGreen.activeInHierarchy) {
        dealBetCardAutoRecruitResult();
        if (!status$2.value) return;
        await nodePress(BigButtonGreen);
        await delay(200);
        return;
      }
      const closeTip = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitDisplayView/Content/rewardBg/Bottom/closeTip");
      if (closeTip && closeTip.active && closeTip.activeInHierarchy) {
        const tipString = (_c = closeTip.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _c.string;
        if (tipString && tipString.includes("今日已达自动招募上限")) {
          dealBetCardAutoRecruitResult();
          if (!status$2.value) return;
          await nodePress(closeTip);
          await delay(200);
          betCardAutoRecruitFlag = false;
          return;
        }
        if (tipString && tipString.includes("当次招募次数已满，请再次操作招募。")) {
          dealBetCardAutoRecruitResult();
          if (!status$2.value) return;
          await nodePress(closeTip);
          await delay(500);
          continue;
        }
      }
      const noTip = ccFind("Root/UIScene/UICanvas/Top/SystemConfirmPopupView/Popup/PanelHasTitle/Panel/noTipToggle/Floor");
      const tipsConfirmBtn = ccFind("Root/UIScene/UICanvas/Top/SystemConfirmPopupView/Popup/PanelHasTitle/Panel/BtnLay/BigButtonGreen");
      if (noTip && noTip.active && noTip.activeInHierarchy) {
        if (!status$2.value) return;
        await nodePress(noTip);
        await delay(200);
      }
      if (tipsConfirmBtn && tipsConfirmBtn.active && tipsConfirmBtn.activeInHierarchy) {
        if (!status$2.value) return;
        await nodePress(tipsConfirmBtn);
        await delay(200);
        continue;
      }
      let giveUpBtn = ccFind("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/LabelBox/GiveUpButton");
      if (giveUpBtn && giveUpBtn.active && giveUpBtn.activeInHierarchy) {
        const betBtn = await waitForNodeActive("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/ButtonBox/BigButtonHasProp", true);
        if (betBtn) {
          if (!status$2.value) return;
          await nodePress(giveUpBtn);
          await delay(200);
          continue;
        }
      }
      const heroL = ccFind(`Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/HeroBox/hero3/Panel/HeroBox/PubHeroNode/Animation/Sprite`);
      if (heroL && heroL.active && heroL.activeInHierarchy) {
        const betBtn = ccFind("/Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/ButtonBox/BigButtonHasProp");
        if (betBtn && betBtn.active && betBtn.activeInHierarchy && canTripleBetCard()) return;
      }
      const remainTimesStr = (_e = (_d = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitSettingView/Content/Popup/Bottom/RemainTimesBox/remainTimesLabel")) == null ? void 0 : _d.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _e.string;
      if (remainTimesStr) {
        const remainTimes = parseInt(remainTimesStr);
        if (remainTimes === 0) {
          betCardAutoRecruitFlag = false;
          const closeTipsBtn = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitSettingView/Content/Popup/Bottom/CloseTips");
          if (closeTipsBtn && closeTipsBtn.active && closeTipsBtn.activeInHierarchy) {
            if (!status$2.value) return;
            await nodePress(closeTipsBtn);
            await delay(500);
          }
          return;
        }
      }
      const recruitBeginBtn = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitSettingView/Content/Popup/Bottom/BigButtonGreen/Img");
      if (recruitBeginBtn && recruitBeginBtn.active && recruitBeginBtn.activeInHierarchy) {
        if (!status$2.value) return;
        await nodePress(recruitBeginBtn);
        await delay(500);
        continue;
      }
      const recruitSettingBtn = ccFind("Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/ButtonBox/SettingBox/recruitSettingBtn");
      if (recruitSettingBtn && recruitSettingBtn.active && recruitSettingBtn.activeInHierarchy) {
        if (!status$2.value) return;
        await nodePress(recruitSettingBtn);
        await delay(500);
        continue;
      }
      await delay(200);
    }
  };
  const _hoisted_1$3 = { class: "dialog-footer" };
  const _hoisted_2$1 = { class: "dialog-footer" };
  const _hoisted_3$1 = { class: "statisticsContainer" };
  const _hoisted_4$1 = { class: "importLogContainer" };
  const _hoisted_5$1 = { class: "dialog-footer" };
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    __name: "BetCardBtn",
    setup(__props) {
      const btnClick = async () => {
        status$2.value = !status$2.value;
        csl.log(`自动抽卡: ${status$2.value ? "开" : "关"}`);
        setCanBetCardAutoRecruit();
        try {
          while (status$2.value) {
            if (_GM_getValue("betCardAutoRecruit")) {
              await betCardAutoRecruitOnce();
              await delay(500);
            }
            await betCardOnce();
            await delay(200);
          }
        } catch (e) {
          csl.error(e);
          status$2.value = false;
        }
      };
      const copyLog = () => {
        const log = _GM_getValue("betCardLog") || "";
        if (log) {
          copyToClipboard(log);
          ElementPlus.ElMessage("复制成功");
        }
      };
      const clearLog = () => {
        _GM_setValue("betCardLog", "");
        ElementPlus.ElMessage("已清空日志");
        logContent.value = "";
      };
      vue.onUnmounted(() => {
        status$2.value = false;
      });
      const settingDialogVisiable = vue.ref(false);
      const tripleList = vue.ref([]);
      const autoRecruit = vue.ref(false);
      if (!_GM_getValue("betCardTripleList")) {
        _GM_setValue("betCardTripleList", ["quality:红"]);
      }
      if (!_GM_getValue("betCardAutoRecruit")) {
        _GM_setValue("betCardAutoRecruit", false);
      }
      const initSettingsData = () => {
        tripleList.value = _GM_getValue("betCardTripleList");
        autoRecruit.value = _GM_getValue("betCardAutoRecruit");
      };
      const save = () => {
        _GM_setValue("betCardTripleList", tripleList.value);
        _GM_setValue("betCardAutoRecruit", autoRecruit.value);
        ElementPlus.ElMessage("设置已保存");
        settingDialogVisiable.value = false;
      };
      const importlogVisiable = vue.ref(false);
      const importLogContent = vue.ref("");
      const improtLogOverwrite = () => {
        logContent.value = importLogContent.value;
        _GM_setValue("betCardLog", logContent.value);
        importlogVisiable.value = false;
        ElementPlus.ElMessage("已导入日志");
        importLogContent.value = "";
      };
      const importLogAppend = () => {
        logContent.value.trimEnd;
        logContent.value = logContent.value.trimEnd() + "\n" + importLogContent.value.trimStart();
        _GM_setValue("betCardLog", logContent.value);
        importlogVisiable.value = false;
        ElementPlus.ElMessage("已导入日志");
        importLogContent.value = "";
      };
      const betCardStatisticsVisiable = vue.ref(false);
      const statisticsRef1 = vue.ref();
      const statisticsRef2 = vue.ref();
      const showStatistics = async () => {
        var _a;
        betCardStatisticsVisiable.value = true;
        await vue.nextTick();
        const chart1Instance = echarts__namespace.init(statisticsRef1.value);
        const qualitiesDataMap = {};
        const heroesDataMap = {};
        const logRows = logContent.value.split(/\r?\n/);
        for (let row of logRows) {
          const parts = row.split("	");
          const result = (_a = parts == null ? void 0 : parts[2]) == null ? void 0 : _a.match(/\[\d\]\[(.+?)\]\[(.+?)\]/);
          if (result) {
            const quality = result[1];
            if (qualitiesDataMap[quality]) {
              qualitiesDataMap[quality] += 1;
            } else {
              qualitiesDataMap[quality] = 1;
            }
            const heroName = result[2];
            if (heroesDataMap[heroName]) {
              heroesDataMap[heroName].value++;
            } else {
              heroesDataMap[heroName] = {
                name: heroName,
                quality,
                value: 1
              };
            }
          }
        }
        const data1 = ["灰", "蓝", "紫", "橙", "红"].map((key) => ({
          name: key,
          value: qualitiesDataMap[key] || 0
        }));
        chart1Instance.setOption({
          title: {
            text: "品阶分布",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: (params) => {
              return `${params.name}: ${params.value}次`;
            }
          },
          color: ["#999999", "#0033CC", "#9900FF", "#FF9900", "#FF0000"],
          legend: {
            orient: "horizontal",
            left: "left",
            bottom: 30
          },
          series: [{
            name: "品阶分布",
            type: "pie",
            radius: "40%",
            data: data1,
            // [
            // { value: 1048, name: 'Search Engine' },
            // { value: 735, name: 'Direct' },
            // { value: 580, name: 'Email' },
            // { value: 484, name: 'Union Ads' },
            // { value: 300, name: 'Video Ads' }
            // ],
            label: {
              show: true,
              formatter: (params) => {
                return `${params.name}: ${params.percent}%`;
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }]
        });
        const chart2Instance = echarts__namespace.init(statisticsRef2.value);
        const data2 = ["灰", "蓝", "紫", "橙", "红"].map((key) => ({
          name: `品阶: ${key}`,
          path: `品阶: ${key}`,
          value: qualitiesDataMap[key] || 0,
          children: Object.keys(heroesDataMap).filter((heroName) => heroesDataMap[heroName].quality === key).map((heroName) => ({
            name: heroesDataMap[heroName].name,
            path: `品阶: ${key}/${heroesDataMap[heroName].name}`,
            value: heroesDataMap[heroName].value
          }))
        }));
        chart2Instance.setOption({
          title: {
            text: "英雄分布",
            left: "center"
          },
          tooltip: {
            formatter: function(info) {
              var value = info.value;
              var treePathInfo = info.treePathInfo;
              var treePath = [];
              for (var i = 1; i < treePathInfo.length; i++) {
                treePath.push(treePathInfo[i].name);
              }
              return [
                '<div class="tooltip-title">' + echarts__namespace.format.encodeHTML(treePath[treePath.length - 1]) + "</div>",
                "命中: " + echarts__namespace.format.addCommas(value) + " 次"
              ].join("");
            }
          },
          series: [{
            name: "英雄分布",
            type: "treemap",
            visibleMin: 0,
            leafDepth: 1,
            drillDownIcon: "",
            width: "98%",
            height: "80%",
            label: {
              show: true,
              formatter: "{b}: {c}"
            },
            itemStyle: {
              borderColor: "#fff"
            },
            levels: getLevelOption(),
            data: data2
          }]
        });
        function getLevelOption() {
          const colorMap = {
            "品阶: 灰": "#999999",
            "品阶: 蓝": "#0033CC",
            "品阶: 紫": "#9900FF",
            "品阶: 橙": "#FF9900",
            "品阶: 红": "#FF0000"
          };
          return [{
            color: data2.sort((a, b) => b.value - a.value).map((a) => colorMap[a.name]),
            itemStyle: {
              borderColor: "#777",
              borderWidth: 0,
              gapWidth: 1
            },
            upperLabel: {
              show: false
            }
          }, {
            itemStyle: {
              borderColor: "#555",
              borderWidth: 1,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: "#ddd"
              }
            }
          }];
        }
      };
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_button_group = vue.resolveComponent("el-button-group");
        const _component_el_tree_select = vue.resolveComponent("el-tree-select");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        const _component_el_input = vue.resolveComponent("el-input");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_button_group, { class: "group" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_button, {
                type: vue.unref(status$2) ? "primary" : "default",
                size: "small",
                onClick: btnClick
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 抽卡: " + vue.toDisplayString(vue.unref(status$2) ? "开" : "关"), 1)
                ]),
                _: 1
              }, 8, ["type"]),
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[0] || (_cache[0] = ($event) => {
                  initSettingsData();
                  settingDialogVisiable.value = true;
                })
              }, {
                default: vue.withCtx(() => _cache[13] || (_cache[13] = [
                  vue.createTextVNode("设置")
                ])),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                size: "small",
                onClick: _cache[1] || (_cache[1] = ($event) => {
                  betCardLogVisiable.value = true;
                  logContent.value = vue.unref(_GM_getValue)("betCardLog") || "";
                })
              }, {
                default: vue.withCtx(() => _cache[14] || (_cache[14] = [
                  vue.createTextVNode("日志")
                ])),
                _: 1
              })
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_dialog, {
            class: "setting-dialog",
            modelValue: settingDialogVisiable.value,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => settingDialogVisiable.value = $event),
            title: "抽卡设置",
            width: "min(calc(90vw), 450px)"
          }, {
            footer: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_1$3, [
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: save,
                  type: "primary"
                }, {
                  default: vue.withCtx(() => _cache[15] || (_cache[15] = [
                    vue.createTextVNode("保存")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: _cache[4] || (_cache[4] = ($event) => settingDialogVisiable.value = false),
                  type: "default"
                }, {
                  default: vue.withCtx(() => _cache[16] || (_cache[16] = [
                    vue.createTextVNode("关闭")
                  ])),
                  _: 1
                })
              ])
            ]),
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form, null, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form_item, {
                    label: "三倍抽卡清单",
                    "label-width": 140
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_tree_select, {
                        class: "setting-dialog-select",
                        placeholder: "选择需要三倍抽卡的英雄",
                        "check-on-click-node": "",
                        multiple: "",
                        "check-strictly": "",
                        modelValue: tripleList.value,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => tripleList.value = $event),
                        data: vue.unref(heroesTreeSelectData),
                        "render-after-expand": false,
                        "show-checkbox": ""
                      }, null, 8, ["modelValue", "data"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, {
                    label: "优先使用自动招募",
                    "label-width": 140
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: autoRecruit.value,
                        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => autoRecruit.value = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"]),
          vue.createVNode(_component_el_dialog, {
            "before-close": (done) => {
              done();
              logContent.value = "";
            },
            class: "bet-card-log",
            modelValue: vue.unref(betCardLogVisiable),
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => vue.isRef(betCardLogVisiable) ? betCardLogVisiable.value = $event : null),
            title: "抽卡日志",
            width: "calc(90vw)"
          }, {
            footer: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_2$1, [
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: showStatistics,
                  type: "warning"
                }, {
                  default: vue.withCtx(() => _cache[17] || (_cache[17] = [
                    vue.createTextVNode("统计")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: _cache[6] || (_cache[6] = ($event) => importlogVisiable.value = true),
                  type: "info"
                }, {
                  default: vue.withCtx(() => _cache[18] || (_cache[18] = [
                    vue.createTextVNode("导入")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: copyLog,
                  type: "primary"
                }, {
                  default: vue.withCtx(() => _cache[19] || (_cache[19] = [
                    vue.createTextVNode("复制")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: clearLog,
                  type: "danger"
                }, {
                  default: vue.withCtx(() => _cache[20] || (_cache[20] = [
                    vue.createTextVNode("清空")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: _cache[7] || (_cache[7] = ($event) => betCardLogVisiable.value = false),
                  type: "default"
                }, {
                  default: vue.withCtx(() => _cache[21] || (_cache[21] = [
                    vue.createTextVNode("关闭")
                  ])),
                  _: 1
                })
              ])
            ]),
            default: vue.withCtx(() => [
              vue.createElementVNode("pre", {
                ref_key: "logPreRef",
                ref: logPreRef
              }, vue.toDisplayString(vue.unref(logContent)), 513)
            ]),
            _: 1
          }, 8, ["before-close", "modelValue"]),
          vue.createVNode(_component_el_dialog, {
            "destroy-on-close": "",
            modelValue: betCardStatisticsVisiable.value,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => betCardStatisticsVisiable.value = $event),
            title: "抽卡统计",
            width: "min(calc(90vw), 450px)"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_3$1, [
                vue.createElementVNode("div", {
                  style: { "height": "min(calc(50%), 300px)", "width": "calc(100%)" },
                  ref_key: "statisticsRef1",
                  ref: statisticsRef1
                }, null, 512),
                vue.createElementVNode("div", {
                  style: { "height": "min(calc(50%), 300px)", "width": "calc(100%)" },
                  ref_key: "statisticsRef2",
                  ref: statisticsRef2
                }, null, 512)
              ])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          vue.createVNode(_component_el_dialog, {
            "destroy-on-close": "",
            modelValue: importlogVisiable.value,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => importlogVisiable.value = $event),
            title: "导入日志",
            width: "calc(90vw)"
          }, {
            footer: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_5$1, [
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: improtLogOverwrite,
                  type: "primary"
                }, {
                  default: vue.withCtx(() => _cache[22] || (_cache[22] = [
                    vue.createTextVNode("覆盖导入")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: importLogAppend,
                  type: "success"
                }, {
                  default: vue.withCtx(() => _cache[23] || (_cache[23] = [
                    vue.createTextVNode("新增导入")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  size: "small",
                  onClick: _cache[11] || (_cache[11] = ($event) => {
                    importlogVisiable.value = false;
                    importLogContent.value = "";
                  }),
                  type: "default"
                }, {
                  default: vue.withCtx(() => _cache[24] || (_cache[24] = [
                    vue.createTextVNode("关闭")
                  ])),
                  _: 1
                })
              ])
            ]),
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_4$1, [
                vue.createVNode(_component_el_input, {
                  modelValue: importLogContent.value,
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => importLogContent.value = $event),
                  style: { "width": "100%", "height": "100%" },
                  type: "textarea",
                  placeholder: "请粘贴抽卡日志文本"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 64);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const BetCardBtn = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-fbcb57d2"]]);
  const status$1 = vue.ref(false);
  const start$1 = async () => {
    status$1.value = !status$1.value;
    csl.log(`战神陵打肉: ${status$1.value ? "开" : "关"}`);
    if (status$1.value) {
      const path = [
        { x: 1533, y: 1390 },
        { x: 790, y: 1518 },
        { x: 187, y: 1059 },
        { x: -481, y: 1265 },
        { x: -1299, y: 1188 },
        { x: -1264, y: 338 },
        { x: -1188, y: -221 },
        { x: -1032, y: -635 },
        { x: -546, y: -124 },
        { x: 390, y: -11 },
        { x: 1484, y: -249 },
        { x: 1042, y: 409 },
        { x: 1188, y: 1058 },
        { x: 1837, y: 1706 }
      ];
      try {
        await movePath(path, true);
        status$1.value = false;
      } catch (e) {
        csl.error(e);
        status$1.value = false;
      }
    } else {
      setMoveInterrupt();
    }
  };
  const _sfc_main$c = /* @__PURE__ */ vue.defineComponent({
    __name: "CollectMeatZhanShenLingBtn",
    setup(__props) {
      const btnClick = () => {
        start$1();
      };
      vue.onUnmounted(() => {
        status$1.value = false;
        setMoveInterrupt();
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: vue.unref(status$1) ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 战神陵打肉: " + vue.toDisplayString(vue.unref(status$1) ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const status = vue.ref(false);
  const getBossPts = () => {
    var _a;
    return (_a = ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer")) == null ? void 0 : _a.children.filter((ele) => {
      var _a2, _b, _c;
      if (/^Boss/i.test(ele.name)) {
        const frameName = (_c = (_b = (_a2 = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
        if (frameName && !/[\-_]Die/i.test(frameName)) {
          return true;
        }
      }
      return false;
    }).map((ele) => {
      return {
        x: ele.position.x,
        y: ele.position.y
      };
    });
  };
  const start = async () => {
    status.value = !status.value;
    csl.log(`F4打金币: ${status.value ? "开" : "关"}`);
    if (status.value) {
      try {
        while (true) {
          if (!status.value) throw new Error("打金中断");
          await backHome();
          await delay(200);
          const manifierRect = getNearestMagnifierRect();
          if (!status.value) throw new Error("打金中断");
          await rectPress(manifierRect);
          const leftHSBLBtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/Panel/Panel1/PlaceScrollView/view/content/PlaceItemView[7]");
          await delay(200);
          if (!status.value) throw new Error("打金中断");
          await nodePress(leftHSBLBtn);
          const rightDTLDbtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/TeleportSelectView/TabPagePanel/Bg/Panel/Panel1/TeleportScrollView/view/content/TeleportSelectItemView[1]");
          await delay(500);
          if (!status.value) throw new Error("打金中断");
          await nodePress(rightDTLDbtn);
          await delay(1500);
          await waitForNodeActive("Root/GameScene/OperationCanvas/MapButtonView/BuildingButton01");
          await delay(200);
          if (!status.value) throw new Error("打金中断");
          await moveToXY(-10016, -3885);
          let bossPts = getBossPts();
          if (!bossPts) throw new Error("boss位置获取失败");
          let teamPosition = getTeamPosition();
          if (!teamPosition) throw new Error("队伍位置获取失败");
          let path = planPath(teamPosition, bossPts);
          while ((bossPts == null ? void 0 : bossPts.length) && path.length) {
            const t1 = Date.now();
            if (!status.value) throw new Error("打金中断");
            await moveToXY(path[0].x, path[0].y);
            const t2 = Date.now();
            if (t2 - t1 > 300) {
              await delay(random(1e3, 1500));
            } else {
              await delay(random(200, 500));
            }
            bossPts = getBossPts();
            if (!bossPts) break;
            teamPosition = getTeamPosition();
            if (!teamPosition) throw new Error("队伍位置获取失败");
            path = planPath(teamPosition, bossPts);
          }
          await delay(1e3);
        }
      } catch (e) {
        csl.error(e);
        status.value = false;
      }
    } else {
      status.value = false;
      setMoveInterrupt();
    }
  };
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    __name: "CollectGoldenF4Btn",
    setup(__props) {
      const btnClick = async () => {
        start();
      };
      vue.onUnmounted(() => {
        status.value = false;
        setMoveInterrupt();
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: vue.unref(status) ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" F4打金币: " + vue.toDisplayString(vue.unref(status) ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    __name: "RoamBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = async () => {
        var _a;
        status2.value = !status2.value;
        if (status2.value) {
          try {
            while (true) {
              const monsterPts = (_a = ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer")) == null ? void 0 : _a.children.filter((ele) => {
                var _a2, _b, _c;
                if (/^Monster|^Boss/i.test(ele.name)) {
                  const frameName = (_c = (_b = (_a2 = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
                  if (frameName && !/[\-_]Die/i.test(frameName)) {
                    return true;
                  }
                }
                return false;
              }).map((ele) => ele.position);
              const teamPosition = getTeamPosition();
              if (!teamPosition) throw new Error("队伍位置获取失败");
              if (!monsterPts) throw new Error("怪位置获取失败");
              const path = planPath(teamPosition, monsterPts);
              csl.log(path);
              const len = Math.min(path.length, 2);
              if (len === 0) throw new Error("没找到怪");
              for (let i = 0; i < len; i++) {
                const t1 = Date.now();
                await moveToXY(path[i].x, path[i].y);
                const t2 = Date.now();
                if (t2 - t1 > 300) {
                  await delay(random(2e3, 3e3));
                } else {
                  await delay(random(200, 500));
                }
              }
              await delay(500);
            }
          } catch (e) {
            csl.error(e);
            status2.value = false;
          }
        } else {
          setMoveInterrupt();
        }
      };
      vue.onUnmounted(() => {
        status2.value = false;
        setMoveInterrupt();
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status2.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 智能寻怪: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const ROAM_PATHS = [
    // 普通难度，4个地图
    [
      // 开局可能有瑕疵
      { x: 2048, y: 280 },
      { x: 1731, y: 312 },
      { x: 1292, y: -200 },
      { x: 724, y: -536 },
      { x: 314, y: -806 },
      { x: -271, y: -888 },
      { x: -712, y: -877 },
      { x: -1095, y: -575 },
      { x: -850, y: -198 },
      { x: -620, y: 166 },
      { x: -598, y: 607 },
      { x: -221, y: 522 }
    ],
    [
      // 已测试
      { x: 235, y: 1292 },
      { x: 5, y: 727 },
      { x: 554, y: 392 },
      { x: 1143, y: 64 },
      { x: 567, y: -120 },
      { x: 9, y: -401 },
      { x: -464, y: -449 },
      { x: -858, y: -184 },
      { x: -1281, y: 73 },
      { x: -1741, y: 78 }
    ],
    [
      // 已测试
      { x: 455, y: -100 },
      { x: 954, y: -155 },
      { x: 1454, y: -109 },
      { x: 1878, y: -11 },
      { x: 2245, y: 228 },
      { x: 2244, y: 490 },
      { x: 1835, y: 743 },
      { x: 1331, y: 1053 },
      { x: 848, y: 1305 },
      { x: 354, y: 1569 },
      { x: -43, y: 1623 },
      { x: -282, y: 1238 },
      { x: -752, y: 950 },
      { x: -1124, y: 931 },
      { x: -460, y: 477 },
      { x: -950, y: 272 }
    ],
    [
      // 已测试
      { x: 1372, y: 280 },
      { x: 703, y: 83 },
      { x: 862, y: -293 },
      { x: 340, y: -137 },
      { x: 484, y: -534 },
      { x: -77, y: -347 },
      { x: -612, y: -544 },
      { x: -914, y: -479 },
      { x: -603, y: -879 },
      // 后加的
      { x: -887, y: -990 },
      // 后加的
      { x: -509, y: -828 },
      { x: -194, y: -938 },
      { x: 329, y: -1115 }
    ]
    // TODO 精英难度
    // TODO 噩梦难度
  ];
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "RoamPathBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = async () => {
        status2.value = !status2.value;
        if (status2.value) {
          while (true) {
            if (!status2.value) return;
            for (let path of ROAM_PATHS) {
              try {
                if (nearBy(path[0].x, path[0].y)) {
                  try {
                    await movePath(path);
                  } catch (e) {
                    csl.error(e);
                    status2.value = false;
                  }
                }
              } catch (e) {
                csl.error(e);
                await delay(2e3);
              }
            }
            await delay(1e3);
          }
        } else {
          setMoveInterrupt();
        }
      };
      vue.onUnmounted(() => {
        status2.value = false;
        setMoveInterrupt();
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status2.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 预定义路线: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "DungeonBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      let intervalId = null;
      let monitorInterrupt = false;
      const btnClick = async () => {
        status2.value = !status2.value;
        if (intervalId) {
          clearInterval(intervalId);
        }
        if (status2.value) {
          try {
            while (true) {
              if (!status2.value) return;
              const tapHint = ccFind("Root/UIScene/UICanvas/Popup/DungeonPassView/content/TapHint");
              if (tapHint && tapHint.active && tapHint.activeInHierarchy) {
                csl.log(`副本结束`);
                if (intervalId) {
                  clearInterval(intervalId);
                  intervalId = null;
                }
                if (!status2.value) return;
                await nodePress(tapHint);
                await delay(5e3);
              }
              if (!status2.value) return;
              const btnEnter = ccFind("Root/UIScene/UICanvas/Popup/DungeonCenterView/TabPagePanel/Bg/Panel/Panel1/BtnLayout/BtnEnter");
              await delay(2e3);
              if (btnEnter && btnEnter.active && btnEnter.activeInHierarchy) {
                csl.log(`进入副本`);
                if (!status2.value) return;
                await nodePress(btnEnter);
                if (!status2.value) return;
                let closeTipBtn = null;
                intervalId = setInterval(() => {
                  var _a, _b, _c, _d;
                  const bossProc = (_b = (_a = ccFind("Root/UIScene/UICanvas/Menu/DungeonMainView/BossNode/BossCount")) == null ? void 0 : _a.getComponent(_unsafeWindow.cc.LabelComponent)) == null ? void 0 : _b.string;
                  const monsterProc = (_d = (_c = ccFind("Root/UIScene/UICanvas/Menu/DungeonMainView/MonsterNode/MonsterCount")) == null ? void 0 : _c.getComponent(_unsafeWindow.cc.LabelComponent)) == null ? void 0 : _d.string;
                  csl.log(`bossProc: ${bossProc}, monsterProc: ${monsterProc}`);
                  if ("1/1" === bossProc && "80/80" === monsterProc) {
                    monitorInterrupt = true;
                    setMoveInterrupt();
                  }
                }, 500);
                try {
                  closeTipBtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/CommonGetWayView/BigPopup/closeTip", true, 2e3);
                } catch (e) {
                }
                if (closeTipBtn) {
                  throw new Error("未知弹窗");
                }
                if (!status2.value) return;
                const pathId = await waitForPositions(ROAM_PATHS.map((paths) => paths[0]));
                if (pathId === -1) throw new Error("路线未找到");
                await delay(3e3);
                try {
                  if (!status2.value) return;
                  csl.log(`开始副本第一层`);
                  await movePathWithMonster(ROAM_PATHS[pathId], status2);
                  csl.log(`结束复本第一层`);
                  throw new Error(`通过报错进入副本第二层`);
                } catch (e) {
                  if (e instanceof Error && e.message === "路线未找到") throw e;
                  if (e instanceof Error && e.message === "中断本次移动" && !monitorInterrupt) throw e;
                  monitorInterrupt = false;
                  if (!status2.value) return;
                  const pathId2 = await waitForPositions(ROAM_PATHS.map((paths) => paths[0]));
                  await delay(3e3);
                  if (pathId2 === -1) throw new Error("路线未找到");
                  if (!status2.value) return;
                  try {
                    csl.log(`开始副本第二层`);
                    await movePathWithMonster(ROAM_PATHS[pathId2], status2);
                  } catch (e2) {
                    if (e2 instanceof Error && e2.message === "路线未找到") throw e2;
                    if (e2 instanceof Error && e2.message === "中断本次移动" && !monitorInterrupt) throw e2;
                    monitorInterrupt = false;
                  }
                  csl.log(`结束复本第二层`);
                }
              }
              await delay(1e3);
            }
          } catch (e) {
            csl.error(e);
            status2.value = false;
          }
        } else {
          setMoveInterrupt();
        }
      };
      vue.onUnmounted(() => {
        status2.value = false;
        setMoveInterrupt();
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status2.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 召唤副本: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const _hoisted_1$2 = { class: "dialog-footer" };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "ChestBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = async () => {
        status2.value = !status2.value;
        if (status2.value) {
          try {
            while (true) {
              if (!status2.value) return;
              await claimOnce();
              if (!status2.value) return;
              await delay(1e3);
            }
          } catch (e) {
            csl.error(e);
            status2.value = false;
          }
        }
      };
      async function claimOnce() {
        var _a;
        let count = 1;
        while (count--) {
          if (!status2.value) return;
          const closeTip = ccFind("Root/UIScene/UICanvas/Popup/RewardDisplayView/empty/rewardBg/closeTip");
          if (closeTip && closeTip.active && closeTip.activeInHierarchy) {
            if (!status2.value) return;
            await nodePress(closeTip);
            await delay(1e3);
            if (count) continue;
            return;
          }
          if (!status2.value) return;
          const textLeftCount = ccFind("Root/UIScene/UICanvas/Popup/FunctionChestPreviewView/Panel/TextLayout/TextLeftCount");
          if (textLeftCount && textLeftCount.active && textLeftCount.activeInHierarchy) {
            if (!status2.value) return;
            const labelString = (_a = textLeftCount.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _a.string;
            if (!labelString || !labelString.includes("/")) throw new Error("获取剩余次数失败");
            const [leftCount, _totalCount] = labelString.split("/").map((str) => Number(str));
            if (leftCount > _GM_getValue("AUTOCHEST_LEFTCOUNT", 0)) {
              if (!status2.value) return;
              const btnClaimAd = ccFind("Root/UIScene/UICanvas/Popup/FunctionChestPreviewView/Panel/BtnAd");
              if (_GM_getValue("AUTOCHEST_ADCLAIM", true) && btnClaimAd && btnClaimAd.active && btnClaimAd.activeInHierarchy) {
                if (!status2.value) return;
                await nodePress(btnClaimAd);
                await delay(2e3);
                count += 2;
                continue;
              }
              if (!status2.value) return;
              const btnClaim = ccFind("Root/UIScene/UICanvas/Popup/FunctionChestPreviewView/Panel/BtnDirectClaim");
              if (btnClaim && btnClaim.active && btnClaim.activeInHierarchy) {
                if (!status2.value) return;
                await nodePress(btnClaim);
                await delay(2e3);
                count++;
                continue;
              }
              if (!status2.value) return;
              const btnClaim2 = ccFind("Root/UIScene/UICanvas/Popup/FunctionChestPreviewView/Panel/BtnClaim");
              if (btnClaim2 && btnClaim2.active && btnClaim2.activeInHierarchy) {
                if (!status2.value) return;
                await nodePress(btnClaim2);
                await delay(2e3);
                count++;
                continue;
              }
            } else {
              throw new Error("已达到剩余次数上限，不领了");
            }
          }
          let magnifierRect = null;
          try {
            if (!status2.value) return;
            magnifierRect = getNearestMagnifierRect();
          } catch (e) {
          }
          if (magnifierRect && isHerosStatus(["Idle", "Gather"])) {
            if (!status2.value) return;
            await rectPress(magnifierRect);
            await delay(1e3);
            count++;
            continue;
          } else {
            count++;
          }
          await delay(1e3);
        }
      }
      const settingDialogVisiable = vue.ref(false);
      const config_LEFTCOUNT = vue.ref(0);
      const config_ADCLAIM = vue.ref(true);
      const openSettings = () => {
        config_LEFTCOUNT.value = _GM_getValue("AUTOCHEST_LEFTCOUNT", 0);
        config_ADCLAIM.value = _GM_getValue("AUTOCHEST_ADCLAIM", true);
        settingDialogVisiable.value = true;
      };
      const save = () => {
        _GM_setValue("AUTOCHEST_LEFTCOUNT", config_LEFTCOUNT.value);
        _GM_setValue("AUTOCHEST_ADCLAIM", config_ADCLAIM.value);
        ElementPlus.ElMessage("设置已保存");
        settingDialogVisiable.value = false;
      };
      vue.onUnmounted(() => {
        status2.value = false;
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_button_group = vue.resolveComponent("el-button-group");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        const _component_el_switch = vue.resolveComponent("el-switch");
        const _component_el_form = vue.resolveComponent("el-form");
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_button_group, { class: "group" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_button, {
                type: status2.value ? "primary" : "default",
                size: "small",
                onClick: btnClick
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 自动开箱: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
                ]),
                _: 1
              }, 8, ["type"]),
              vue.createVNode(_component_el_button, {
                onClick: openSettings,
                size: "small"
              }, {
                default: vue.withCtx(() => _cache[4] || (_cache[4] = [
                  vue.createTextVNode("设置")
                ])),
                _: 1
              })
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_dialog, {
            class: "setting-dialog",
            modelValue: settingDialogVisiable.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => settingDialogVisiable.value = $event),
            title: "自动开箱设置",
            width: "300px"
          }, {
            footer: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_1$2, [
                vue.createVNode(_component_el_button, {
                  onClick: save,
                  type: "primary"
                }, {
                  default: vue.withCtx(() => _cache[5] || (_cache[5] = [
                    vue.createTextVNode("保存")
                  ])),
                  _: 1
                }),
                vue.createVNode(_component_el_button, {
                  onClick: _cache[2] || (_cache[2] = ($event) => settingDialogVisiable.value = false),
                  type: "default"
                }, {
                  default: vue.withCtx(() => _cache[6] || (_cache[6] = [
                    vue.createTextVNode("关闭")
                  ])),
                  _: 1
                })
              ])
            ]),
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form, { size: "small" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_form_item, {
                    label: "留多少次不开",
                    "label-width": 100
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input, {
                        modelValue: config_LEFTCOUNT.value,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => config_LEFTCOUNT.value = $event),
                        autocomplete: "off",
                        type: "number"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_form_item, {
                    label: "是否开广告",
                    "label-width": 100
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_switch, {
                        modelValue: config_ADCLAIM.value,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => config_ADCLAIM.value = $event)
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 64);
      };
    }
  });
  const ChestBtn = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-ff7011a8"]]);
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "RedPackBtn",
    setup(__props) {
      const status$22 = vue.ref(false);
      const btnClick = async () => {
        status$22.value = !status$22.value;
        if (status$22.value) {
          while (true) {
            try {
              csl.log("新一轮等待红包");
              const redPackBtn = await waitForNodeActive("Root/UIScene/UICanvas/Menu/MenuView/SaveArea/DownLeft/RedPacketMenuIconView/Btn");
              if (!status$22.value) return;
              if (redPackBtn) {
                if (status$1.value) {
                  csl.log("检查到正在打肉，20秒后恢复执行打肉");
                  setTimeout(() => {
                    if (!status$1.value) {
                      csl.log("尝试恢复执行打肉");
                      start$1();
                    } else {
                      csl.log("打肉正在执行，不恢复");
                    }
                  }, 2e4);
                }
                if (status.value) {
                  csl.log("检查到正在打金，20秒后恢复执行打金");
                  setTimeout(() => {
                    if (!status.value) {
                      csl.log("尝试恢复执行打金");
                      start();
                    } else {
                      csl.log("打金正在执行，不恢复");
                    }
                  }, 2e4);
                }
                await nodePress(redPackBtn);
                await delay(500);
                csl.log("抢红包");
                const redPackOpenBtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/ActivityRedPacketOpenView/CommonBG2/packet/bg/openInfo/Hongbao_btn_open", true, 5e3);
                if (!status$22.value) return;
                if (redPackOpenBtn) {
                  await nodePress(redPackOpenBtn);
                  csl.log("打开红包");
                  await delay(800);
                  const redPackCloseBtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/ActivityRedPacketOpenView/CommonBG2/CloseTip", false, 2e3);
                  if (!status$22.value) return;
                  nodePress(redPackCloseBtn);
                }
              }
              const isOver = ccFind("Root/UIScene/UICanvas/Popup/ActivityRedPacketOpenView/CommonBG2/packet/bg/hasOpenInfo/status/over");
              if (!status$22.value) return;
              if (isOver && isOver.active) {
                csl.log("红包领完了");
                const closeTipBtn = ccFind("Root/UIScene/UICanvas/Popup/ActivityRedPacketOpenView/CommonBG2/CloseTip");
                if (!closeTipBtn) throw new Error("closeTipBtn not found");
                await nodePress(closeTipBtn);
              }
            } catch (e) {
              csl.log(e);
              await delay(1e3);
              if (!status$22.value) return;
            }
          }
        }
      };
      vue.onUnmounted(() => {
        status$22.value = false;
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status$22.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 自动抢红包: " + vue.toDisplayString(status$22.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    __name: "PositionBtn",
    setup(__props) {
      const x = vue.ref("?");
      const y = vue.ref("?");
      const btnClick = async () => {
        const teamPosition = getTeamPosition();
        if (!teamPosition) throw new Error("队伍位置获取失败");
        const str = `{ "x": ${Math.floor(teamPosition.x)}, "y": ${Math.floor(teamPosition.y)} }`;
        await copyToClipboard(str);
        ElementPlus.ElMessage("复制成功：" + str);
      };
      let intervalId = setInterval(() => {
        try {
          const teamPosition = getTeamPosition();
          if (teamPosition) {
            x.value = Math.floor(teamPosition.x).toString();
            y.value = Math.floor(teamPosition.y).toString();
            const dirPos = ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer").children.filter((node) => {
              var _a, _b, _c;
              if (node.name.match(/MaterialUnit\d+_51122\d+/)) {
                const sn = (_c = (_b = (_a = ccFind("Sprite", node)) == null ? void 0 : _a.getComponents(_unsafeWindow.cc.Sprite)[0]) == null ? void 0 : _b.spriteFrame) == null ? void 0 : _c.name;
                return !!sn && !/die/i.test(sn || "");
              }
              return false;
            }).map((node) => ({
              y: node.position.x - teamPosition.x,
              x: node.position.y - teamPosition.y
            }));
            setDirectAssists(dirPos);
          } else {
            x.value = "?";
            y.value = "?";
          }
        } catch (e) {
          x.value = "?";
          y.value = "?";
        }
      }, 1e3);
      vue.onUnmounted(() => {
        clearInterval(intervalId);
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 坐标: (" + vue.toDisplayString(x.value) + ", " + vue.toDisplayString(y.value) + ") ", 1)
          ]),
          _: 1
        });
      };
    }
  });
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "FullScreenBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const getFullscreenElement = () => {
        const doc = document;
        return doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement;
      };
      const requestFullscreen = (el) => {
        const element = el;
        if (element.requestFullscreen) return element.requestFullscreen();
        if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen();
        if (element.msRequestFullscreen) return element.msRequestFullscreen();
        return Promise.reject("不支持全屏API");
      };
      const exitFullscreen = () => {
        const doc = document;
        if (doc.exitFullscreen) return doc.exitFullscreen();
        if (doc.webkitExitFullscreen) return doc.webkitExitFullscreen();
        if (doc.msExitFullscreen) return doc.msExitFullscreen();
        return Promise.reject("不支持退出全屏API");
      };
      const updateFullscreenStatus = () => {
        status2.value = !!getFullscreenElement();
      };
      vue.onMounted(() => {
        document.addEventListener("fullscreenchange", updateFullscreenStatus);
        document.addEventListener("webkitfullscreenchange", updateFullscreenStatus);
        document.addEventListener("MSFullscreenChange", updateFullscreenStatus);
      });
      vue.onUnmounted(() => {
        document.removeEventListener("fullscreenchange", updateFullscreenStatus);
        document.removeEventListener("webkitfullscreenchange", updateFullscreenStatus);
        document.removeEventListener("MSFullscreenChange", updateFullscreenStatus);
      });
      const btnClick = async () => {
        try {
          if (!getFullscreenElement()) {
            await requestFullscreen(document.documentElement);
            status2.value = true;
          } else {
            await exitFullscreen();
            status2.value = false;
          }
        } catch (err) {
          console.error("全屏错误:", err);
          ElementPlus.ElMessage.error(`全屏错误：${err}`);
        }
      };
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: status2.value ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => [
            vue.createTextVNode(" 全屏: " + vue.toDisplayString(status2.value ? "开" : "关"), 1)
          ]),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const funComponents = [{
    id: "PauseBossBtn",
    component: _sfc_main$f,
    name: "Boss暂停",
    description: "可以让Boss定身不打你",
    hideInLite: true
  }, {
    id: "PauseMonsterBtn",
    component: _sfc_main$e,
    name: "小怪暂停",
    description: "可以让小怪定身不打你",
    hideInLite: true
  }, {
    id: "BetCardBtn",
    component: BetCardBtn,
    name: "自动抽卡",
    description: "可以进行自动抽卡"
  }, {
    id: "CollectMeatZhanShenLingBtn",
    component: _sfc_main$c,
    name: "自动打肉（战神陵）",
    description: "在无尽深渊-熔火之境-战神陵绕圈打肉"
  }, {
    id: "CollectGoldenF4Btn",
    component: _sfc_main$b,
    name: "自动打金币（F4）",
    description: "在英雄大陆-黑石堡垒-大厅楼道打4个boss获取金币、也可以在这里刷经验"
  }, {
    id: "RoamBtn",
    component: _sfc_main$a,
    name: "智能寻怪",
    description: "实验性功能，查找附近的boss和小怪，并自动规划路线打怪，目前无法避障",
    hideInLite: true
  }, {
    id: "RoamPathBtn",
    component: _sfc_main$9,
    name: "预定义路线",
    description: "实验性功能，启动时获取当前坐标与已知路线的起点比较，若匹配则以该路线进行行进",
    hideInLite: true
  }, {
    id: "DungeonBtn",
    component: _sfc_main$8,
    name: "召唤副本",
    description: "打100级的召唤副本，打开召唤副本界面，选择好难度后运行可自动打副本，根据已知路线与附近怪物动动态实时规划路线，可保证任意阵容不漏怪打副本"
  }, {
    id: "ChestBtn",
    component: ChestBtn,
    name: "自动开箱",
    description: "原地自动领宝箱，一般用于挂机boss领宝箱"
  }, {
    id: "RedPackBtn",
    component: _sfc_main$6,
    name: "自动抢红包",
    description: "实时查找左下角红包按钮，出现了就抢红包，不一定能抢到"
  }, {
    id: "FullScreenBtn",
    component: _sfc_main$4,
    name: "全屏",
    description: "点击后申请全屏，以便移动端可以全屏游玩"
  }, {
    id: "PositionBtn",
    component: _sfc_main$5,
    name: "坐标显示",
    description: "显示当前坐标，点击后可复制坐标，一般用于路线制作时的坐标获取"
  }];
  const useDynamicPathTool = () => {
    const status2 = vue.ref(false);
    const start2 = async (config) => {
      status2.value = !status2.value;
      csl.log(`动态路线[${config.name}]: ${status2.value ? "开" : "关"}`);
      if (status2.value) {
        const path = config.path;
        try {
          if (config.dynamicMonster) {
            await movePathWithMonster(path, status2, config.isCircle);
          } else {
            await movePath(path, config.isCircle);
          }
          status2.value = false;
        } catch (e) {
          csl.error(e);
          status2.value = false;
        }
      } else {
        setMoveInterrupt();
      }
    };
    return {
      status: status2,
      start: start2
    };
  };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "DynamicPathBtn",
    props: {
      id: String
    },
    setup(__props, { expose: __expose }) {
      const { start: start2, status: status2 } = useDynamicPathTool();
      const props = __props;
      const componentConfig = vue.ref();
      vue.onMounted(() => {
        loadConfig();
      });
      vue.onUnmounted(() => {
        status2.value = false;
        setMoveInterrupt();
      });
      const loadConfig = () => {
        setMoveInterrupt();
        if (!props.id) throw Error(`dynamic path btn id cannot be null`);
        const config = getComponentConfig(props.id);
        if (!config) throw Error(`dynamic path [${props.id}] cannot be resolved`);
        componentConfig.value = config;
      };
      const btnClick = () => {
        if (!componentConfig.value) throw Error(`dynamic path [${props.id}] cannot be resolved`);
        csl.log(`dynamic path config: `, componentConfig.value);
        start2(componentConfig.value);
      };
      __expose({
        loadConfig
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createBlock(_component_el_button, {
          type: vue.unref(status2) ? "primary" : "default",
          size: "small",
          onClick: btnClick
        }, {
          default: vue.withCtx(() => {
            var _a;
            return [
              vue.createTextVNode(vue.toDisplayString(((_a = componentConfig.value) == null ? void 0 : _a.name) || "动态按钮unkown") + ": " + vue.toDisplayString(vue.unref(status2) ? "开" : "关"), 1)
            ];
          }),
          _: 1
        }, 8, ["type"]);
      };
    }
  });
  const CONFIG_KEY$1 = "component_config";
  function getDefaultConfig() {
    return funComponents.reduce((acc, comp) => {
      acc[comp.id] = { visible: true, order: funComponents.indexOf(comp) };
      return acc;
    }, {});
  }
  function getComponentsConfig$1() {
    let defaultConfig = getDefaultConfig();
    csl.log("defaultConfig", defaultConfig);
    let savedConfig = _GM_getValue(CONFIG_KEY$1, null);
    if (!savedConfig) {
      savedConfig = defaultConfig;
      _GM_setValue(CONFIG_KEY$1, savedConfig);
    }
    savedConfig = { ...defaultConfig, ...savedConfig };
    csl.log("savedConfig", savedConfig);
    return savedConfig;
  }
  function getComponentConfig(id) {
    const config = getComponentsConfig$1();
    return config[id] || null;
  }
  function setComponentsConfig(config) {
    const currentConfig = getComponentsConfig$1();
    const newConfig = { ...currentConfig };
    for (const [id, cfg] of Object.entries(config)) {
      if (newConfig[id]) {
        newConfig[id] = { ...newConfig[id], ...cfg };
      }
    }
    _GM_setValue(CONFIG_KEY$1, newConfig);
  }
  function getButtonComponents(isLite = true) {
    const config = getComponentsConfig$1();
    return Object.keys(config).sort((id1, id2) => config[id1].order - config[id2].order).map((id) => {
      const ComponentConfigSingle = config[id];
      if (ComponentConfigSingle.path) {
        return {
          component: _sfc_main$3,
          ...ComponentConfigSingle
        };
      } else {
        const found = funComponents.find((funComponent) => funComponent.id === id);
        if (!found) {
          csl.warn(`Component ${id} not found in funComponents`);
          return null;
        }
        return found;
      }
    }).filter((component) => {
      if (!component) return false;
      return !isLite || isLite && ("hideInLite" in component ? !component.hideInLite : true);
    });
  }
  /*! Element Plus Icons Vue v2.3.1 */
  var info_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
    name: "InfoFilled",
    __name: "info-filled",
    setup(__props) {
      return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1024 1024"
      }, [
        vue.createElementVNode("path", {
          fill: "currentColor",
          d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
        })
      ]));
    }
  });
  var info_filled_default = info_filled_vue_vue_type_script_setup_true_lang_default;
  const CONFIG_KEY = "component_config";
  function setDynamicComponents(components) {
    const config = getComponentsConfig();
    csl.log("config", config);
    let maxOrder = 0;
    Object.keys(config).forEach((id) => {
      const component = components.find((item) => item.id === id);
      if (component) {
        config[id] = { ...config[id], ...component };
      } else if (config[id].path) {
        delete config[id];
      }
      if (config[id] && maxOrder < config[id].order) {
        maxOrder = config[id].order;
      }
    });
    components.forEach((component) => {
      if (!config[component.id]) {
        config[component.id] = {
          visible: false,
          order: maxOrder + 1,
          ...component
        };
      }
    });
    _GM_setValue(CONFIG_KEY, config);
  }
  function getDynamicComponents() {
    const config = getComponentsConfig();
    return Object.keys(config).filter((id) => {
      var _a;
      return (_a = config[id]) == null ? void 0 : _a.path;
    }).map((id) => {
      const comp = config[id];
      return {
        id: comp.id,
        name: comp.name,
        description: comp.description,
        path: comp.path,
        isCircle: comp.isCircle,
        dynamicMonster: comp.dynamicMonster
      };
    });
  }
  function getComponentsConfig() {
    const savedConfig = _GM_getValue(CONFIG_KEY, {});
    return savedConfig;
  }
  const _hoisted_1$1 = { class: "dialog-content" };
  const _hoisted_2 = { class: "settings-list" };
  const _hoisted_3 = ["data-id"];
  const _hoisted_4 = { class: "name-text" };
  const _hoisted_5 = { style: { "text-align": "right", "margin": "0" } };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "ButtonSetting",
    props: {
      isLite: Boolean
    },
    emits: ["saved"],
    setup(__props, { emit: __emit }) {
      const props = __props;
      const allComponents = vue.ref([]);
      const activeTab = vue.ref("buttons");
      const dynamicPaths = vue.ref([]);
      const editingPath = vue.ref(null);
      const showPathDialog = vue.ref(false);
      const deleteVisible = vue.ref([]);
      const showSettings = vue.ref(false);
      const settings = vue.ref({});
      const isMobile = vue.ref(window.innerWidth <= 450);
      window.addEventListener("resize", () => {
        isMobile.value = window.innerWidth <= 450;
      });
      const open = () => {
        initData();
        showSettings.value = true;
      };
      const initData = () => {
        const config = getComponentsConfig$1();
        allComponents.value = getButtonComponents(props.isLite);
        dynamicPaths.value = getDynamicComponents();
        deleteVisible.value = new Array(dynamicPaths.value.length).fill(false);
        allComponents.value.forEach((comp) => {
          var _a, _b;
          settings.value[comp.id] = {
            visible: ((_a = config[comp.id]) == null ? void 0 : _a.visible) ?? false,
            order: ((_b = config[comp.id]) == null ? void 0 : _b.order) ?? allComponents.value.indexOf(comp),
            name: comp.name,
            description: comp.description
          };
        });
      };
      const emit = __emit;
      const saveDynamicPaths = () => {
        try {
          setDynamicComponents(dynamicPaths.value);
          initData();
          emit("saved");
          ElementPlus.ElMessage.success("路线保存成功");
        } catch (e) {
          csl.error("动态路线保存失败:", e);
          ElementPlus.ElMessage.error("动态路线保存失败");
        }
      };
      const addPath = () => {
        editingPath.value = {
          id: `dynamic_${Date.now()}`,
          name: "",
          description: "",
          path: [],
          pathStr: "[]",
          isCircle: false,
          dynamicMonster: false
        };
        showPathDialog.value = true;
      };
      const editPath = (index) => {
        const path = JSON.parse(JSON.stringify(dynamicPaths.value[index]));
        path._index = index;
        path.pathStr = `[
${path.path.map((pathNode) => `	${JSON.stringify(pathNode)}`).join(",\n")}
]`;
        if (!path.id) {
          path.id = `dynamic_${Date.now()}`;
        }
        editingPath.value = path;
        showPathDialog.value = true;
      };
      const deletePath = (index) => {
        dynamicPaths.value.splice(index, 1);
        saveDynamicPaths();
      };
      const savePath = () => {
        if (!editingPath.value) return;
        try {
          const path = { ...editingPath.value };
          if (!path.id) {
            path.id = `dynamic_${Date.now()}`;
          }
          path.path = JSON.parse(editingPath.value.pathStr || "[]");
          delete path._index;
          delete path.pathStr;
          if (editingPath.value._index !== void 0) {
            dynamicPaths.value[editingPath.value._index] = path;
          } else {
            dynamicPaths.value.push(path);
          }
          showPathDialog.value = false;
          saveDynamicPaths();
        } catch (e) {
          ElementPlus.ElMessage.error("路线配置JSON格式错误");
        }
      };
      const save = () => {
        const config = {};
        Object.entries(settings.value).forEach(([id, setting]) => {
          config[id] = {
            visible: setting.visible,
            order: setting.order
          };
        });
        setComponentsConfig(config);
        showSettings.value = false;
        emit("saved");
      };
      const initSortable = () => {
        vue.nextTick(() => {
          const el = document.querySelector(".settings-list");
          if (el && !el.getAttribute("data-sortable-initialized")) {
            Sortable.create(el, {
              animation: 150,
              handle: ".drag-handle",
              onEnd: (_evt) => {
                const items = Array.from(el.children);
                items.forEach((item, index) => {
                  const id = item.getAttribute("data-id");
                  if (id) {
                    settings.value[id].order = index;
                  }
                });
              }
            });
            el.setAttribute("data-sortable-initialized", "true");
          }
        });
      };
      vue.watch(showSettings, (newVal) => {
        if (newVal) {
          initSortable();
        }
      });
      return (_ctx, _cache) => {
        const _component_el_button_group = vue.resolveComponent("el-button-group");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(vue.unref(ElementPlus.ElButton), {
            size: "small",
            onClick: open
          }, {
            default: vue.withCtx(() => _cache[10] || (_cache[10] = [
              vue.createTextVNode("按钮设置")
            ])),
            _: 1
          }),
          vue.createVNode(vue.unref(ElementPlus.ElDialog), {
            modelValue: showSettings.value,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => showSettings.value = $event),
            title: "按钮设置",
            width: "400px",
            fullscreen: isMobile.value,
            "append-to-body": ""
          }, {
            footer: vue.withCtx(() => [
              activeTab.value === "buttons" ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                style: vue.normalizeStyle(isMobile.value ? "text-align: center" : "")
              }, [
                vue.createVNode(vue.unref(ElementPlus.ElButton), {
                  onClick: _cache[8] || (_cache[8] = ($event) => showSettings.value = false)
                }, {
                  default: vue.withCtx(() => _cache[20] || (_cache[20] = [
                    vue.createTextVNode("取消")
                  ])),
                  _: 1
                }),
                vue.createVNode(vue.unref(ElementPlus.ElButton), {
                  type: "primary",
                  onClick: save
                }, {
                  default: vue.withCtx(() => _cache[21] || (_cache[21] = [
                    vue.createTextVNode("保存")
                  ])),
                  _: 1
                })
              ], 4)) : vue.createCommentVNode("", true)
            ]),
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_1$1, [
                vue.createVNode(vue.unref(ElementPlus.ElTabs), {
                  modelValue: activeTab.value,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => activeTab.value = $event)
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(ElementPlus.ElTabPane), {
                      label: "按钮选择",
                      name: "buttons"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("div", _hoisted_2, [
                          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(allComponents.value, (comp) => {
                            var _a;
                            return vue.openBlock(), vue.createElementBlock("div", {
                              key: comp.id,
                              class: "setting-item",
                              "data-id": comp.id,
                              style: vue.normalizeStyle({ opacity: ((_a = settings.value[comp.id]) == null ? void 0 : _a.visible) ? 1 : 0.6 })
                            }, [
                              _cache[11] || (_cache[11] = vue.createElementVNode("div", { class: "drag-handle" }, "≡", -1)),
                              vue.createVNode(vue.unref(ElementPlus.ElCheckbox), {
                                modelValue: settings.value[comp.id].visible,
                                "onUpdate:modelValue": ($event) => settings.value[comp.id].visible = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              vue.createElementVNode("span", _hoisted_4, vue.toDisplayString(settings.value[comp.id].name || comp.id), 1),
                              comp.description ? (vue.openBlock(), vue.createBlock(vue.unref(ElementPlus.ElPopover), {
                                key: 0,
                                placement: "top",
                                width: 200,
                                trigger: "hover"
                              }, {
                                reference: vue.withCtx(() => [
                                  vue.createVNode(vue.unref(ElementPlus.ElButton), {
                                    size: "small",
                                    circle: ""
                                  }, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(vue.unref(ElementPlus.ElIcon), null, {
                                        default: vue.withCtx(() => [
                                          vue.createVNode(vue.unref(info_filled_default))
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("div", null, vue.toDisplayString(settings.value[comp.id].description), 1)
                                ]),
                                _: 2
                              }, 1024)) : vue.createCommentVNode("", true)
                            ], 12, _hoisted_3);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    }),
                    vue.createVNode(vue.unref(ElementPlus.ElTabPane), {
                      label: "动态路线",
                      name: "paths"
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(vue.unref(ElementPlus.ElButton), {
                          type: "primary",
                          onClick: addPath,
                          size: "small",
                          style: { "float": "right", "margin-bottom": "5px" }
                        }, {
                          default: vue.withCtx(() => _cache[12] || (_cache[12] = [
                            vue.createTextVNode("添加路线")
                          ])),
                          _: 1
                        }),
                        vue.createVNode(vue.unref(ElementPlus.ElTable), {
                          data: dynamicPaths.value,
                          border: ""
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(vue.unref(ElementPlus.ElTableColumn), {
                              prop: "name",
                              label: "名称"
                            }),
                            vue.createVNode(vue.unref(ElementPlus.ElTableColumn), {
                              prop: "isCircle",
                              label: "循环",
                              align: "center",
                              width: "60"
                            }, {
                              default: vue.withCtx(({ row }) => [
                                vue.createVNode(vue.unref(ElementPlus.ElCheckbox), {
                                  modelValue: row.isCircle,
                                  "onUpdate:modelValue": ($event) => row.isCircle = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(vue.unref(ElementPlus.ElTableColumn), {
                              prop: "dynamicMonster",
                              align: "center",
                              label: "动态打怪",
                              width: "60"
                            }, {
                              default: vue.withCtx(({ row }) => [
                                vue.createVNode(vue.unref(ElementPlus.ElCheckbox), {
                                  modelValue: row.dynamicMonster,
                                  "onUpdate:modelValue": ($event) => row.dynamicMonster = $event,
                                  disabled: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            vue.createVNode(vue.unref(ElementPlus.ElTableColumn), {
                              label: "操作",
                              align: "center",
                              width: "120"
                            }, {
                              default: vue.withCtx(({ $index }) => [
                                vue.createVNode(_component_el_button_group, null, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(ElementPlus.ElButton), {
                                      size: "small",
                                      onClick: ($event) => editPath($index)
                                    }, {
                                      default: vue.withCtx(() => _cache[13] || (_cache[13] = [
                                        vue.createTextVNode("编辑")
                                      ])),
                                      _: 2
                                    }, 1032, ["onClick"]),
                                    vue.createVNode(vue.unref(ElementPlus.ElPopover), {
                                      visible: deleteVisible.value[$index],
                                      placement: "top",
                                      width: "160"
                                    }, {
                                      reference: vue.withCtx(() => [
                                        vue.createVNode(vue.unref(ElementPlus.ElButton), {
                                          size: "small",
                                          type: "danger",
                                          onClick: ($event) => deleteVisible.value[$index] = true
                                        }, {
                                          default: vue.withCtx(() => _cache[14] || (_cache[14] = [
                                            vue.createTextVNode(" 删除 ")
                                          ])),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ]),
                                      default: vue.withCtx(() => [
                                        _cache[17] || (_cache[17] = vue.createElementVNode("p", null, "是否删除？", -1)),
                                        vue.createElementVNode("div", _hoisted_5, [
                                          vue.createVNode(vue.unref(ElementPlus.ElButton), {
                                            size: "small",
                                            onClick: ($event) => deleteVisible.value[$index] = false
                                          }, {
                                            default: vue.withCtx(() => _cache[15] || (_cache[15] = [
                                              vue.createTextVNode("取消")
                                            ])),
                                            _: 2
                                          }, 1032, ["onClick"]),
                                          vue.createVNode(vue.unref(ElementPlus.ElButton), {
                                            size: "small",
                                            type: "danger",
                                            onClick: ($event) => {
                                              deletePath($index);
                                              deleteVisible.value[$index] = false;
                                            }
                                          }, {
                                            default: vue.withCtx(() => _cache[16] || (_cache[16] = [
                                              vue.createTextVNode("确定")
                                            ])),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["visible"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["data"]),
                        vue.createVNode(vue.unref(ElementPlus.ElDialog), {
                          modelValue: showPathDialog.value,
                          "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => showPathDialog.value = $event),
                          title: "路线配置",
                          width: "min(calc(90vw), 400px)"
                        }, {
                          footer: vue.withCtx(() => [
                            vue.createVNode(vue.unref(ElementPlus.ElButton), {
                              onClick: _cache[5] || (_cache[5] = ($event) => showPathDialog.value = false)
                            }, {
                              default: vue.withCtx(() => _cache[18] || (_cache[18] = [
                                vue.createTextVNode("取消")
                              ])),
                              _: 1
                            }),
                            vue.createVNode(vue.unref(ElementPlus.ElButton), {
                              type: "primary",
                              onClick: savePath
                            }, {
                              default: vue.withCtx(() => _cache[19] || (_cache[19] = [
                                vue.createTextVNode("保存")
                              ])),
                              _: 1
                            })
                          ]),
                          default: vue.withCtx(() => [
                            editingPath.value ? (vue.openBlock(), vue.createBlock(vue.unref(ElementPlus.ElForm), {
                              key: 0,
                              "label-width": "100px"
                            }, {
                              default: vue.withCtx(() => [
                                vue.createVNode(vue.unref(ElementPlus.ElFormItem), {
                                  class: "dynamic-btn-form-item",
                                  label: "名称"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(ElementPlus.ElInput), {
                                      modelValue: editingPath.value.name,
                                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editingPath.value.name = $event)
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }),
                                vue.createVNode(vue.unref(ElementPlus.ElFormItem), {
                                  class: "dynamic-btn-form-item",
                                  label: "描述"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(ElementPlus.ElInput), {
                                      modelValue: editingPath.value.description,
                                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => editingPath.value.description = $event),
                                      type: "textarea",
                                      rows: 2
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }),
                                vue.createVNode(vue.unref(ElementPlus.ElFormItem), {
                                  class: "dynamic-btn-form-item",
                                  label: "属性"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(ElementPlus.ElCheckbox), {
                                      label: "是否循环",
                                      modelValue: editingPath.value.isCircle,
                                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => editingPath.value.isCircle = $event)
                                    }, null, 8, ["modelValue"]),
                                    vue.createVNode(vue.unref(ElementPlus.ElCheckbox), {
                                      label: "动态打怪",
                                      modelValue: editingPath.value.dynamicMonster,
                                      "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => editingPath.value.dynamicMonster = $event)
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                }),
                                vue.createVNode(vue.unref(ElementPlus.ElFormItem), {
                                  class: "dynamic-btn-form-item",
                                  label: "路线配置(JSON)"
                                }, {
                                  default: vue.withCtx(() => [
                                    vue.createVNode(vue.unref(ElementPlus.ElInput), {
                                      modelValue: editingPath.value.pathStr,
                                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => editingPath.value.pathStr = $event),
                                      type: "textarea",
                                      rows: 8
                                    }, null, 8, ["modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : vue.createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "fullscreen"])
        ], 64);
      };
    }
  });
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "PathViewer",
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_el_dialog = vue.resolveComponent("el-dialog");
        return vue.openBlock(), vue.createBlock(_component_el_dialog, {
          class: "path-viewer",
          "modal-class": "path-viewer-modal",
          top: "0px",
          modelValue: vue.unref(shown),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(shown) ? shown.value = $event : null),
          modal: false,
          "show-close": true,
          draggable: "",
          width: "200px",
          "destroy-on-close": "",
          "close-on-click-modal": false
        }, {
          header: vue.withCtx(() => _cache[1] || (_cache[1] = [
            vue.createElementVNode("span", null, "线路图", -1)
          ])),
          footer: vue.withCtx(() => _cache[2] || (_cache[2] = [])),
          default: vue.withCtx(() => [
            vue.createElementVNode("div", {
              ref_key: "echartsRef",
              ref: echartsRef,
              style: { "width": "200px", "height": "200px" }
            }, "echarts显示区域", 512)
          ]),
          _: 1
        }, 8, ["modelValue"]);
      };
    }
  });
  const _hoisted_1 = { class: "zz-sub-btns" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    props: {
      isLite: Boolean
    },
    setup(__props) {
      const btnContainer = vue.ref();
      const btn = vue.ref();
      const components = vue.shallowRef([]);
      const btnSetting = vue.ref({});
      const dynamicPathBtnRefs = vue.ref({});
      vue.onMounted(() => {
        setButton();
      });
      const btnClick = () => {
        var _a, _b;
        (_a = btnContainer.value) == null ? void 0 : _a.classList.toggle("zz-show");
        (_b = btn.value) == null ? void 0 : _b.classList.toggle("zz-rotate");
      };
      const tempHide = () => {
        var _a, _b;
        btn.value.style.display = "none";
        (_a = btnContainer.value) == null ? void 0 : _a.classList.toggle("zz-show");
        (_b = btn.value) == null ? void 0 : _b.classList.toggle("zz-rotate");
        setTimeout(() => {
          btn.value.style.display = "block";
        }, 5e3);
      };
      const setButton = () => {
        dynamicPathBtnRefs.value = {};
        components.value = getButtonComponents(props.isLite);
        btnSetting.value = getComponentsConfig$1();
        vue.nextTick(() => {
          csl.log("dynamicPathBtnRefs.value", dynamicPathBtnRefs.value);
          vue.nextTick(() => {
            Object.values(dynamicPathBtnRefs.value).forEach((comp) => {
              csl.log(comp);
              comp == null ? void 0 : comp.loadConfig();
            });
          });
        });
      };
      const props = __props;
      return (_ctx, _cache) => {
        const _component_el_button_group = vue.resolveComponent("el-button-group");
        return vue.openBlock(), vue.createElementBlock("div", {
          ref_key: "btnContainer",
          ref: btnContainer,
          class: "zz-float-container"
        }, [
          vue.createElementVNode("div", {
            ref_key: "btn",
            ref: btn,
            onClick: btnClick,
            class: "zz-float-btn",
            role: "button",
            tabindex: "0"
          }, "+", 512),
          vue.createElementVNode("div", _hoisted_1, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(components.value, (comp) => {
              var _a;
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                ((_a = btnSetting.value[comp.id]) == null ? void 0 : _a.visible) ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(comp.component), {
                  key: comp.id,
                  id: comp.id,
                  ref_for: true,
                  ref: (el) => {
                    var _a2;
                    if ((_a2 = btnSetting.value[comp.id]) == null ? void 0 : _a2.path) dynamicPathBtnRefs.value[comp.id] = el;
                  }
                }, null, 8, ["id"])) : vue.createCommentVNode("", true)
              ], 64);
            }), 256)),
            vue.createVNode(_component_el_button_group, { class: "group" }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(ElementPlus.ElButton), {
                  size: "small",
                  onClick: tempHide
                }, {
                  default: vue.withCtx(() => _cache[0] || (_cache[0] = [
                    vue.createTextVNode("临时隐藏")
                  ])),
                  _: 1
                }),
                vue.createVNode(_sfc_main$2, {
                  "is-lite": __props.isLite,
                  onSaved: setButton
                }, null, 8, ["is-lite"])
              ]),
              _: 1
            })
          ]),
          vue.createVNode(_sfc_main$1)
        ], 512);
      };
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ee34aa69"]]);
  vue.createApp(App, { isLite: true }).use(ElementPlus, { zIndex: 4e3 }).mount(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  );

})(Vue, ElementPlus, echarts, Sortable);