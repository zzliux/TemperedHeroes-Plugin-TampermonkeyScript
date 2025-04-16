// ==UserScript==
// @name         「百炼英雄」插件 - project
// @namespace    zzliux/TemperedHeroes-Plugin
// @version      1.0.12
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
// @resource     element-plus/dist/index.css  https://registry.npmmirror.com/element-plus/2.9.7/files/dist/index.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// ==/UserScript==

(t=>{if(typeof GM_addStyle=="function"){GM_addStyle(t);return}const e=document.createElement("style");e.textContent=t,document.head.append(e)})(" .bet-card-log .el-dialog__footer,.bet-card-log .el-dialog__header{padding-top:0!important;padding-bottom:0!important}.setting-dialog-select .el-select-dropdown__item{text-align:left!important}.importLogContainer .el-textarea__inner{height:100%}.group[data-v-a0461cf5]{width:max-content;margin-bottom:4px;float:right}.importLogContainer[data-v-a0461cf5],.bet-card-log pre[data-v-a0461cf5]{overflow:auto;height:calc(85vh - 260px);text-align:left;font-size:12px}.statisticsContainer[data-v-a0461cf5]{overflow-x:hidden;height:calc(85vh - 214px);text-align:left}.setting-dialog .el-dialog__footer{padding-top:0!important;padding-bottom:0!important}.group[data-v-e48b3bd3]{width:max-content;margin-bottom:4px;float:right}.zz-float-btn[data-v-ecebe67f]{position:fixed;bottom:10px;right:10px;width:30px;height:30px;border-radius:50%;background:#ff4757;color:#fff;border:0;cursor:pointer;font-size:18px;box-shadow:0 4px 12px #0003;transition:.3s;z-index:1000;outline:none;-webkit-user-select:none;user-select:none;align-items:center;justify-content:center;line-height:27px}.zz-sub-btns[data-v-ecebe67f]{position:fixed;bottom:40px;right:10px;opacity:0;transition:.3s;pointer-events:none;display:block;width:min-content}.zz-sub-btns>button[data-v-ecebe67f]{margin-bottom:4px;float:right}.zz-show .zz-sub-btns[data-v-ecebe67f]{opacity:1;pointer-events:all}.zz-rotate[data-v-ecebe67f]{transform:rotate(45deg)!important}.btn-group[data-v-ecebe67f]{width:max-content;margin-bottom:4px;float:right} ");

(async function (vue, ElementPlus, echarts) {
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

  var _a, _b;
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
    { id: "86001", name: "姜尚", quality: "白金" }
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
  if (/mobile.+safari/ig.test(navigator.userAgent)) {
    const dom = await( waitForDom('img[src="https://ad-static.boomegg.cn/operation/image/IOS引导图.png"]'));
    if (dom) {
      csl.log("检测到引导图，移除引导图");
      (_b = (_a = dom.parentElement) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.remove();
    }
  }
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
    var _a2;
    const uiTransform = targetNode.getComponent(_unsafeWindow.cc.UITransformComponent);
    if (!uiTransform) throw new Error("uiTransform not found");
    const worldPos = targetNode.worldPosition;
    const { width, height } = uiTransform.contentSize;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const topLeft = new _unsafeWindow.cc.Vec3(worldPos.x - halfWidth, worldPos.y + halfHeight, worldPos.z);
    const bottomRight = new _unsafeWindow.cc.Vec3(worldPos.x + halfWidth, worldPos.y - halfHeight, worldPos.z);
    const camera = (_a2 = _unsafeWindow.cc.find("Root/UIScene/UICamera")) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Camera);
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
    const eventDown = new MouseEvent("mousedown", {
      clientX: x,
      clientY: y
    });
    const canvasDom2 = document.querySelector("#GameCanvas");
    canvasDom2 == null ? void 0 : canvasDom2.dispatchEvent(eventDown);
    await delay(timeout);
    const eventUp = new MouseEvent("mouseup", {
      clientX: x,
      clientY: y
    });
    canvasDom2 == null ? void 0 : canvasDom2.dispatchEvent(eventUp);
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
    var _a2, _b2, _c, _d;
    const idName = heroesIdMap;
    const ret = [];
    for (let i = 1; i <= 3; i++) {
      const str = `Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/HeroBox/hero${i}/Panel/HeroBox/PubHeroNode/Animation/Sprite`;
      const heroSpriteFrameName = (_c = (_b2 = (_a2 = ccFind(str)) == null ? void 0 : _a2.getComponents(_unsafeWindow.cc.Sprite)[0]) == null ? void 0 : _b2.spriteFrame) == null ? void 0 : _c.name;
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
    const currentPosition = getTeamPosition();
    if (!currentPosition) throw new Error("getTeamPosition failed");
    x2 = x2 || currentPosition.x;
    y2 = y2 || currentPosition.y;
    const distance2 = Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
    if (distance2 < 60) return true;
    return false;
  }
  _unsafeWindow.nearBy = nearBy;
  let canvasDom;
  let moveStatus = false;
  let moveInterrupt = false;
  async function moveToXY(x, y) {
    if (moveStatus) {
      throw new Error("正在移动，请勿重复调用");
    }
    if (nearBy(x, y)) return;
    moveStatus = true;
    if (!canvasDom) {
      canvasDom = document.querySelector("#GameCanvas");
      if (!canvasDom) throw new Error("canvasDom not found");
    }
    const width = canvasDom.clientWidth;
    const height = canvasDom.clientHeight;
    let centerX = width / 2 + random(-25, 25), centerY = height * 3 / 4 + random(-25, 25);
    await delay(10);
    const eventDown = new MouseEvent("mousedown", {
      clientX: centerX,
      clientY: centerY
    });
    canvasDom.dispatchEvent(eventDown);
    updateDebugRect({ x: centerX - 4, y: centerY - 4, width: 7, height: 7 }, 102);
    const maxR = random(60, 110);
    await new Promise((resolve, reject) => {
      let lastPosition = null;
      let stuckCount = 0;
      const t1 = Date.now();
      const tid = setInterval(() => {
        try {
          const currentPosition = getTeamPosition();
          const distance2 = Math.sqrt(Math.pow(currentPosition.x - x, 2) + Math.pow(currentPosition.y - y, 2));
          csl.log(`当前: (${Math.round(currentPosition.x)}, ${Math.round(currentPosition.y)}), 目标: (${Math.round(x)}, ${Math.round(y)}), 距离: ${Math.round(distance2)}`);
          const offsetXOrigin = x - currentPosition.x;
          const offsetYOrigin = currentPosition.y - y;
          const rOrigion = Math.sqrt(offsetXOrigin * offsetXOrigin + offsetYOrigin * offsetYOrigin);
          const offsetX = offsetXOrigin / rOrigion * maxR;
          const offsetY = offsetYOrigin / rOrigion * maxR;
          const currentX = Math.round(centerX + offsetX);
          const currentY = Math.round(centerY + offsetY);
          if (Date.now() - t1 > 10 * 1e3) {
            clearInterval(tid);
            const eventUp = new MouseEvent("mouseup", {
              clientX: currentX,
              clientY: currentY
            });
            canvasDom.dispatchEvent(eventUp);
            updateDebugRect({ x: currentX - 4, y: currentX - 4, width: 7, height: 7 }, 102);
            moveStatus = false;
            reject("moveToXY: 超时");
          }
          if (moveInterrupt) {
            clearInterval(tid);
            const eventUp = new MouseEvent("mouseup", {
              clientX: currentX,
              clientY: currentY
            });
            canvasDom.dispatchEvent(eventUp);
            updateDebugRect({ x: currentX - 4, y: currentY - 4, width: 7, height: 7 }, 102);
            moveInterrupt = false;
            moveStatus = false;
            reject("中断本次移动");
          }
          const eventMove = new MouseEvent("mousemove", {
            clientX: currentX,
            clientY: currentY
          });
          canvasDom.dispatchEvent(eventMove);
          updateDebugRect({ x: currentX - 4, y: currentY - 4, width: 7, height: 7 }, 102);
          if (lastPosition && currentPosition.x === lastPosition.x && currentPosition.y === lastPosition.y) {
            if (++stuckCount >= 3) {
              clearInterval(tid);
              const eventUp = new MouseEvent("mouseup", {
                clientX: currentX,
                clientY: currentY
              });
              canvasDom.dispatchEvent(eventUp);
              updateDebugRect({ x: currentX - 4, y: currentY - 4, width: 7, height: 7 }, 102);
              moveStatus = false;
              reject("moveToXY: 卡住了，出不来");
            }
          }
          if (nearBy(x, y)) {
            clearInterval(tid);
            const eventUp = new MouseEvent("mouseup", {
              clientX: currentX,
              clientY: currentY
            });
            canvasDom.dispatchEvent(eventUp);
            updateDebugRect({ x: currentX - 4, y: currentY - 4, width: 7, height: 7 }, 102);
            resolve();
          }
          lastPosition = currentPosition;
        } catch (e) {
          clearInterval(tid);
          moveStatus = false;
          reject(e);
        }
      }, 100);
    });
    moveStatus = false;
  }
  _unsafeWindow.moveToXY = moveToXY;
  async function movePath(path) {
    for (let i = 0; i < path.length; i++) {
      const t1 = Date.now();
      await moveToXY(path[i].x, path[i].y);
      const t2 = Date.now();
      if (t2 - t1 > 300) {
        await delay(random(2e3, 3e3));
      } else {
        await delay(random(200, 500));
      }
    }
  }
  _unsafeWindow.movePath = movePath;
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
      await nodePress(backHomeBtn);
      const confirmBtn = await waitForNodeActive("Root/UIScene/UICanvas/Popup/ConfirmPopup/Popup/PanelHasTitle/Panel/BtnLay/BigButtonGreen");
      await delay(200);
      await nodePress(confirmBtn);
      await delay(200);
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
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
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
            var _a2, _b2, _c;
            if (/^boss/i.test(ele.name)) {
              if (status2.value) {
                const frameName = (_c = (_b2 = (_a2 = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b2.spriteFrame) == null ? void 0 : _c.name;
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
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
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
            var _a2, _b2, _c;
            if (/^Monster/i.test(ele.name)) {
              if (status2.value) {
                const frameName = (_c = (_b2 = (_a2 = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b2.spriteFrame) == null ? void 0 : _c.name;
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
    var _a2;
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
        const betBtnIconFrameSprite = (_a2 = ccFind("Root/UIScene/UICanvas/Content/PubMainView/Content/Panel/PubView/Content/Stage/BottomLayout/PubRecruitButtonView/ButtonBox/BigButtonHasProp/Img/PropNode/Icon")) == null ? void 0 : _a2.getComponents(_unsafeWindow.cc.Sprite)[0];
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
    var _a2;
    const str = (_a2 = ccFind("Root/UIScene/UICanvas/Popup/PubAutoRecruitDisplayView/Content/rewardBg/ScrollView/view/content")) == null ? void 0 : _a2.children.map((node) => {
      var _a3, _b2;
      const targetFramePath = (_b2 = (_a3 = ccFind("Content/propItem/content/propIcon", node)) == null ? void 0 : _a3.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b2.targetFramePath;
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
    var _a2, _b2, _c, _d, _e;
    if (!betCardAutoRecruitFlag) return;
    while (true) {
      if (!status$2.value) return;
      if ("符合筛选条件的英雄已经出现" === ((_b2 = (_a2 = ccFind("Root/UIScene/UICanvas/Top/ToastPopup/center/LabelToastItem/txt")) == null ? void 0 : _a2.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _b2.string)) {
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
  const _hoisted_1$2 = { class: "dialog-footer" };
  const _hoisted_2 = { class: "dialog-footer" };
  const _hoisted_3 = { class: "statisticsContainer" };
  const _hoisted_4 = { class: "importLogContainer" };
  const _hoisted_5 = { class: "dialog-footer" };
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
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
        var _a2;
        betCardStatisticsVisiable.value = true;
        await vue.nextTick();
        const chart1Instance = echarts__namespace.init(statisticsRef1.value);
        const qualitiesDataMap = {};
        const heroesDataMap = {};
        const logRows = logContent.value.split(/\r?\n/);
        for (let row of logRows) {
          const parts = row.split("	");
          const result = (_a2 = parts == null ? void 0 : parts[2]) == null ? void 0 : _a2.match(/\[\d\]\[(.+?)\]\[(.+?)\]/);
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
              vue.createElementVNode("div", _hoisted_1$2, [
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
              vue.createElementVNode("div", _hoisted_2, [
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
              vue.createElementVNode("div", _hoisted_3, [
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
              vue.createElementVNode("div", _hoisted_5, [
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
              vue.createElementVNode("div", _hoisted_4, [
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
  const BetCardBtn = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-a0461cf5"]]);
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
        for (let i = 0; ; i = (i + 1) % path.length) {
          const t1 = Date.now();
          await moveToXY(path[i].x, path[i].y);
          const t2 = Date.now();
          if (t2 - t1 > 300) {
            await delay(random(2e3, 3e3));
          } else {
            await delay(random(200, 500));
          }
        }
      } catch (e) {
        csl.error(e);
        status$1.value = false;
      }
    } else {
      setMoveInterrupt();
    }
  };
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
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
    var _a2;
    return (_a2 = ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer")) == null ? void 0 : _a2.children.filter((ele) => {
      var _a3, _b2, _c;
      if (/^Boss/i.test(ele.name)) {
        const frameName = (_c = (_b2 = (_a3 = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a3.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b2.spriteFrame) == null ? void 0 : _c.name;
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
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
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
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "RoamBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = async () => {
        var _a2;
        status2.value = !status2.value;
        if (status2.value) {
          try {
            while (true) {
              const monsterPts = (_a2 = ccFind("/Root/GameScene/GameMapCanvas/MapView/TileMap/unitLayer")) == null ? void 0 : _a2.children.filter((ele) => {
                var _a3, _b2, _c;
                if (/^Monster|^Boss/i.test(ele.name)) {
                  const frameName = (_c = (_b2 = (_a3 = ccFind("Animation/Sprite", ele)) == null ? void 0 : _a3.getComponent(_unsafeWindow.cc.Sprite)) == null ? void 0 : _b2.spriteFrame) == null ? void 0 : _c.name;
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
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
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
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "DungeonBtn",
    setup(__props) {
      const status2 = vue.ref(false);
      const btnClick = async () => {
        status2.value = !status2.value;
        if (status2.value) {
          try {
            while (true) {
              if (!status2.value) return;
              const tapHint = ccFind("Root/UIScene/UICanvas/Popup/DungeonPassView/content/TapHint");
              if (tapHint && tapHint.active && tapHint.activeInHierarchy) {
                csl.log(`副本结束`);
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
                  await movePath(ROAM_PATHS[pathId]);
                  csl.log(`结束复本第一层`);
                  throw new Error(`通过报错进入副本第二层`);
                } catch (e) {
                  if (e instanceof Error && (e.message === "中断本次移动" || e.message === "路线未找到")) throw e;
                  if (!status2.value) return;
                  const pathId2 = await waitForPositions(ROAM_PATHS.map((paths) => paths[0]));
                  await delay(3e3);
                  if (pathId2 === -1) throw new Error("路线未找到");
                  if (!status2.value) return;
                  try {
                    csl.log(`开始副本第二层`);
                    await movePath(ROAM_PATHS[pathId2]);
                  } catch (e2) {
                    if (e2 instanceof Error && (e2.message === "中断本次移动" || e2.message === "路线未找到")) throw e2;
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
  const _hoisted_1$1 = { class: "dialog-footer" };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
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
        var _a2;
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
            const labelString = (_a2 = textLeftCount.getComponent(_unsafeWindow.cc.Label)) == null ? void 0 : _a2.string;
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
          if (magnifierRect) {
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
              vue.createElementVNode("div", _hoisted_1$1, [
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
  const ChestBtn = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-e48b3bd3"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
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
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "PositionBtn",
    setup(__props) {
      const x = vue.ref("?");
      const y = vue.ref("?");
      const btnClick = async () => {
        const teamPosition = getTeamPosition();
        if (!teamPosition) throw new Error("队伍位置获取失败");
        const str = `{ x: ${Math.floor(teamPosition.x)}, y: ${Math.floor(teamPosition.y)} }`;
        await copyToClipboard(str);
        ElementPlus.ElMessage("复制成功：" + str);
      };
      let intervalId = setInterval(() => {
        try {
          const teamPosition = getTeamPosition();
          if (teamPosition) {
            x.value = Math.floor(teamPosition.x).toString();
            y.value = Math.floor(teamPosition.y).toString();
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
  const _hoisted_1 = { class: "zz-sub-btns" };
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    props: {
      isLite: Boolean
    },
    setup(__props) {
      const btnContainer = vue.ref();
      const btn = vue.ref();
      const btnClick = () => {
        var _a2, _b2;
        (_a2 = btnContainer.value) == null ? void 0 : _a2.classList.toggle("zz-show");
        (_b2 = btn.value) == null ? void 0 : _b2.classList.toggle("zz-rotate");
      };
      return (_ctx, _cache) => {
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
            !__props.isLite ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              vue.createVNode(_sfc_main$b),
              vue.createVNode(_sfc_main$a)
            ], 64)) : vue.createCommentVNode("", true),
            vue.createVNode(BetCardBtn),
            vue.createVNode(_sfc_main$8),
            vue.createVNode(_sfc_main$7),
            vue.createVNode(_sfc_main$6),
            !__props.isLite ? (vue.openBlock(), vue.createBlock(_sfc_main$5, { key: 1 })) : vue.createCommentVNode("", true),
            vue.createVNode(_sfc_main$4),
            vue.createVNode(ChestBtn),
            vue.createVNode(_sfc_main$2),
            vue.createVNode(_sfc_main$1)
          ])
        ], 512);
      };
    }
  });
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ecebe67f"]]);
  vue.createApp(App, { isLite: true }).use(ElementPlus).mount(
    (() => {
      const app = document.createElement("div");
      document.body.append(app);
      return app;
    })()
  );

})(Vue, ElementPlus, echarts);