/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var END_DATE, START_DATE, TABLE_NAME, X, bracketRegex, controls, convertScheduleToGoogleGanttChartData, convertScheduleToGoogleGanttChartData2, diffStr, drawGantt, drawLines, drawSVG, drop, endCondition, errorMessage, fixdata, handleDragLeave, handleDragover, handleDrop, initData, isIE, later, moment, process_wb, rABS, rangeArray, regex, resourceFromTasks, resources, returnOption, rgen, schedule, splitWithoutNull, startCondition, str, tgen, to_csv, to_csv2, to_formulae, update,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  hasProp = {}.hasOwnProperty;

	X = XLSX;

	rABS = typeof FileReader != 'undefined' && typeof FileReader.prototype != 'undefined' && typeof FileReader.prototype.readAsBinaryString != 'undefined';

	drop = document.getElementById('drop');

	isIE = navigator.appName === 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv 11/));

	fixdata = function(data) {
	  var l, o, w;
	  o = '';
	  l = 0;
	  w = 10240;
	  while (l < data.byteLength / w) {
	    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
	    ++l;
	  }
	  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
	  return o;
	};

	to_csv = function(workbook) {
	  var result;
	  result = [];
	  workbook.SheetNames.forEach(function(sheetName) {
	    var csv, csvWithoutEmptyLine, k, len, line, ref, tt;
	    csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
	    console.log(csv.split(/\r\n|\r|\n/).length);
	    csvWithoutEmptyLine = [];
	    if (csv.length > 0) {
	      ref = csv.split(/\r\n|\r|\n/);
	      for (k = 0, len = ref.length; k < len; k++) {
	        line = ref[k];
	        tt = line.split(",").join("").trim();
	        if (tt.length > 0) {
	          csvWithoutEmptyLine.push(line);
	        }
	      }
	    }
	    if (csv.length > 0) {
	      result.push('SHEET: ' + sheetName);
	      result.push('');
	      result.push(csvWithoutEmptyLine.join("\n"));
	      result.push("\n" + csv);
	    }
	  });
	  return result.join('\n');
	};

	regex = /([A-Z]{1,3})(\d+):([A-Z]{1,3})(\d+)/i;

	str = "A10:G200";

	rangeArray = function(str) {
	  var m;
	  if ((m = regex.exec(str)) !== null) {
	    return [m[1], Number(m[2]), m[3], Number(m[4])];
	  }
	};

	update = __webpack_require__(116);

	to_csv2 = function(wb) {
	  var a, cell, col, i, inp, int01, int02, int12, k, len, len1, mainObj, maxRow, n, name, obj, p, preObj, ref, ref1, ref2, result, ret, row;
	  result = [];
	  ref = wb.SheetNames;
	  for (k = 0, len = ref.length; k < len; k++) {
	    name = ref[k];
	    a = null;
	    a = wb.Sheets[name];
	    maxRow = rangeArray(a["!ref"])[3];
	    if (maxRow > 1000) {
	      maxRow = 1000;
	    }
	    ret = [];
	    for (row = n = 4, ref1 = maxRow; 4 <= ref1 ? n <= ref1 : n >= ref1; row = 4 <= ref1 ? ++n : --n) {
	      obj = {
	        comment: ""
	      };
	      ref2 = "ABCDEFGHIJ".split("");
	      for (i = p = 0, len1 = ref2.length; p < len1; i = ++p) {
	        col = ref2[i];
	        cell = null;
	        cell = a["" + col + row];
	        if (cell != null) {
	          inp = cell.w;
	        } else {
	          inp = null;
	        }
	        if ((cell != null ? cell.c : void 0) != null) {
	          obj.comment += "  " + cell.c[0].t;
	        }
	        if (inp === "" || inp === "null") {
	          inp = null;
	        }
	        switch (i) {
	          case 0:
	            obj.id = inp;
	            break;
	          case 1:
	            obj.name = inp;
	            break;
	          case 2:
	            obj.grp = inp;
	            break;
	          case 3:
	            obj.start = inp;
	            break;
	          case 4:
	            obj.dur = inp;
	            break;
	          case 5:
	            obj.comp = inp;
	            break;
	          case 6:
	            obj.dep = inp;
	            break;
	          case 7:
	            obj.resrc = inp;
	            break;
	          case 8:
	            obj.prty = inp;
	            break;
	          case 9:
	            obj.end = inp;
	        }
	      }
	      if ((obj.start != null) && Number(obj.dur) > 1) {
	        int01 = update(obj, {
	          id: {
	            $set: "pre_" + obj.id
	          }
	        });
	        int02 = update(int01, {
	          start: {
	            $set: diffStr(obj.start, -1)
	          }
	        });
	        preObj = update(int02, {
	          dur: {
	            $set: 1
	          }
	        });
	        int12 = update(obj, {
	          start: {
	            $set: null
	          }
	        });
	        mainObj = update(int12, {
	          dep: {
	            $set: preObj.id
	          }
	        });
	        ret.push(preObj);
	        ret.push(mainObj);
	      } else {
	        ret.push(obj);
	      }
	    }
	    console.log(ret);
	    return ret;
	  }
	};

	resourceFromTasks = function(tasks) {
	  var k, len, len1, n, r, ref, ret, temp, tmp, tsk, tt;
	  console.log(tasks);
	  ret = [];
	  temp = (function() {
	    var k, len, results;
	    results = [];
	    for (k = 0, len = tasks.length; k < len; k++) {
	      tsk = tasks[k];
	      results.push(tsk.resrc);
	    }
	    return results;
	  })();
	  for (k = 0, len = temp.length; k < len; k++) {
	    tmp = temp[k];
	    if (tmp != null) {
	      console.log(tmp);
	      ref = tmp.split(",");
	      for (n = 0, len1 = ref.length; n < len1; n++) {
	        tt = ref[n];
	        if (!(indexOf.call(ret, tt) >= 0)) {
	          if (tt != null) {
	            ret.push(tt);
	          }
	        }
	      }
	    }
	  }
	  return (function() {
	    var len2, p, results;
	    results = [];
	    for (p = 0, len2 = ret.length; p < len2; p++) {
	      r = ret[p];
	      results.push({
	        id: r
	      });
	    }
	    return results;
	  })();
	};

	to_formulae = function(workbook) {
	  var result;
	  result = [];
	  workbook.SheetNames.forEach(function(sheetName) {
	    var formulae;
	    formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
	    if (formulae.length > 0) {
	      result.push('SHEET: ' + sheetName);
	      result.push('');
	      result.push(formulae.join('\n'));
	    }
	  });
	  return result.join('\n');
	};

	errorMessage = function(target, str) {
	  if (target.innerText != null) {
	    return target.innerText = str;
	  } else {
	    return target.textContent = str;
	  }
	};

	process_wb = function(wb) {
	  var DRAW_HEIGHT, DRAW_HEIGHT2, DRAW_ITEMS, DRAW_ITEMS2, DRAW_WIDTH, e, importData, importData2, item, j, labelLists, labelP, op1, op2, output, res, t, taskItems, tasks;
	  output = '';
	  output = to_csv(wb);
	  taskItems = to_csv2(wb);
	  res = resourceFromTasks(taskItems);
	  console.log(res);
	  tasks = tgen(taskItems);
	  try {
	    t = schedule.create(tasks, res, null, new Date("2017/1/1"));
	    console.log(t);
	  } catch (error) {
	    e = error;
	    if (e.message = "Cannot read property 'requiredBy' of undefined") {
	      errorMessage(out2, "依存関係のエラーです。存在しないIDを参照しています。");
	    }
	    console.log(JSON.stringify(e));
	  }
	  if (t.failedTasks != null) {
	    errorMessage(out2, "エラー:" + t.failedTasks.join(", "));
	  } else {
	    errorMessage(out2, "");
	  }
	  importData = convertScheduleToGoogleGanttChartData(taskItems, t);
	  importData2 = convertScheduleToGoogleGanttChartData2(taskItems, t);
	  importData.sort(function(a, b) {
	    return a[3] - b[3];
	  });
	  labelP = function(ar, ind) {
	    var ss, sy;
	    if (ind === 0) {
	      return null;
	    }
	    ss = moment(ar[3]).format("YYYY/MM/DD");
	    sy = moment(ar[3]).add(ar[5] / 60 / 24 / 60 / 1000 - 1, "d").format("YYYY/MM/DD");
	    return ar[1] + "\n" + ss + " - " + sy + "\nduration:" + (ar[5] / 60 / 24 / 60 / 1000) + "\n%complete: " + (ar[6] * 100);
	  };
	  labelLists = (function() {
	    var k, len, results;
	    results = [];
	    for (j = k = 0, len = importData.length; k < len; j = ++k) {
	      item = importData[j];
	      results.push(labelP(item, j));
	    }
	    return results;
	  })();
	  DRAW_WIDTH = 1250;
	  DRAW_ITEMS = importData.length;
	  DRAW_HEIGHT = DRAW_ITEMS * 16 + 40 + 20;
	  DRAW_ITEMS2 = importData2.length;
	  DRAW_HEIGHT2 = DRAW_ITEMS2 * 16 + 40 + 20;
	  op1 = returnOption(DRAW_HEIGHT, DRAW_WIDTH);
	  op2 = returnOption(DRAW_HEIGHT2, DRAW_WIDTH);
	  google.charts.load('current', {
	    'packages': ['gantt']
	  });
	  google.charts.setOnLoadCallback(drawGantt(importData, op1, 'chart_div'));
	  google.charts.setOnLoadCallback(drawGantt(importData2, op2, 'chart_div2'));
	  if (out.innerText == undefined) {
	    out.textContent = output;
	  } else {
	    out.innerText = output;
	  }
	  if (typeof console != 'undefined') {
	    console.log('output', new Date);
	  }
	};

	handleDrop = function(e) {
	  var f, files, lastMod, reader;
	  lastMod = null;
	  console.log("dropped");
	  document.getElementById("drop").style.transition = "all 0.7s";
	  document.getElementById("drop").style.height = "50px";
	  e.stopPropagation();
	  e.preventDefault();
	  files = e.dataTransfer.files;
	  f = files[0];
	  drop.style.backgroundColor = 'white';
	  if (f == null) {
	    return;
	  }
	  lastMod = f.lastModifiedDate;
	  reader = new FileReader;
	  reader.onload = function(e) {
	    var arr, data, wb;
	    data = e.target.result;
	    try {
	      wb = X.read(data, {
	        type: 'binary'
	      });
	    } catch (error) {
	      e = error;
	      console.log(e);
	      arr = fixdata(data);
	      wb = X.read(btoa(arr), {
	        type: 'base64'
	      });
	    }
	    process_wb(wb);
	  };
	  try {
	    reader.readAsBinaryString(f);
	  } catch (error) {
	    e = error;
	    console.log(e);
	    reader.readAsArrayBuffer(f);
	  }
	  if (!isIE) {
	    setInterval((function() {
	      if (lastMod.getTime() !== f.lastModifiedDate.getTime()) {
	        console.log("changed", lastMod);
	        try {
	          reader.readAsBinaryString(f);
	        } catch (error) {
	          e = error;
	          console.log(e);
	          reader.readAsArrayBuffer(f);
	        }
	        return lastMod = f.lastModifiedDate;
	      }
	    }), 12000);
	  }
	};

	handleDragover = function(e) {
	  e.stopPropagation();
	  e.preventDefault();
	  e.dataTransfer.dropEffect = 'copy';
	  if (drop.style.backgroundColor != 'yellow') {
	    drop.style.backgroundColor = 'yellow';
	  }
	};

	handleDragLeave = function(e) {
	  e.stopPropagation();
	  e.preventDefault();
	  if (drop.style.backgroundColor != 'yellow') {
	    drop.style.backgroundColor = 'white';
	  }
	};

	if (drop.addEventListener) {
	  drop.addEventListener('dragenter', handleDragover, false);
	  drop.addEventListener('dragover', handleDragover, false);
	  drop.addEventListener('drop', handleDrop, false);
	  drop.addEventListener('dragleave', handleDragLeave, false);
	}

	START_DATE = new Date("2017/1/1");

	END_DATE = new Date("2018/12/31");

	TABLE_NAME = "2017-2018";

	initData = ["00", TABLE_NAME, null, START_DATE, END_DATE, null, null, null, null];

	moment = __webpack_require__(1);

	schedule = __webpack_require__(119);

	later = __webpack_require__(2);

	diffStr = function(ymdStr, plus) {
	  return moment(ymdStr, "YYYY/MM/DD").add(plus, "d").format("YYYY/MM/DD");
	};

	startCondition = function(str) {
	  var d;
	  d = new Date(str);
	  return {
	    schedules: [
	      {
	        Y_a: [d.getFullYear()],
	        dy_a: [later.dayOfYear.val(d)]
	      }
	    ]
	  };
	};

	endCondition = function(str) {
	  var d;
	  d = new Date(str);
	  return {
	    schedules: [
	      {
	        Y: [d.getFullYear()],
	        dy_b: [later.dayOfYear.val(d) + 1]
	      }
	    ]
	  };
	};

	splitWithoutNull = function(str) {
	  var k, len, ret, x, xitem;
	  x = String(str).split(",");
	  ret = [];
	  for (k = 0, len = x.length; k < len; k++) {
	    xitem = x[k];
	    if ((xitem != null) && xitem !== "") {
	      ret.push(xitem);
	    }
	  }
	  return ret;
	};

	tgen = schedule.tasks().id(function(d) {
	  return d.id;
	}).duration(function(d) {
	  return d.dur * 24 * 60;
	}).dependsOn(function(d) {
	  if (d.dep != null) {
	    return splitWithoutNull(d.dep);
	  }
	}).resources(function(d) {
	  if (d.resrc != null) {
	    return splitWithoutNull(d.resrc);
	  }
	}).priority(function(d) {
	  if (d.prty != null) {
	    return Number(d.prty);
	  } else {
	    return 0;
	  }
	}).available(function(d) {
	  if (d.start != null) {
	    return startCondition(d.start);
	  }
	  return null;
	});

	rgen = schedule.resources().id(function(d) {
	  return d.name;
	});

	resources = [
	  {
	    id: 'A',
	    isNotReservable: true
	  }
	];

	convertScheduleToGoogleGanttChartData = function(originalTaskItems, createdSchedule) {
	  var hasPreItem, key, r, r1, ref, ref1, ret, returnTaskItemWithId, val;
	  ret = [initData];
	  returnTaskItemWithId = function(id) {
	    var it;
	    return ((function() {
	      var k, len, results;
	      results = [];
	      for (k = 0, len = originalTaskItems.length; k < len; k++) {
	        it = originalTaskItems[k];
	        if (it.id === id) {
	          results.push(it);
	        }
	      }
	      return results;
	    })())[0];
	  };
	  hasPreItem = function(ob) {
	    var it, ref;
	    return ref = "pst_" + ob.id, indexOf.call((function() {
	      var k, len, results;
	      results = [];
	      for (k = 0, len = originalTaskItems.length; k < len; k++) {
	        it = originalTaskItems[k];
	        results.push(it.id);
	      }
	      return results;
	    })(), ref) >= 0;
	  };
	  ref = createdSchedule.scheduledTasks;
	  for (key in ref) {
	    if (!hasProp.call(ref, key)) continue;
	    val = ref[key];
	    r = returnTaskItemWithId(key);
	    if (r == null) {
	      break;
	    }
	    if (((ref1 = r.dep) != null ? ref1.substring(0, 4) : void 0) === "pre_") {
	      r1 = [key, "[" + key + "] " + r.grp + "/" + r.name, r.grp, new Date(val.schedule[0].start), null, val.schedule[0].duration * 60 * 1000, Number(r.comp), returnTaskItemWithId(r.dep).dep, "" + r.name];
	    } else {
	      r1 = [key, "[" + key + "] " + r.grp + "/" + r.name, r.grp, new Date(val.schedule[0].start), null, val.schedule[0].duration * 60 * 1000, Number(r.comp), r.dep, "" + r.name];
	    }
	    if (key.substring(0, 4) === "pre_") {
	      console.log("★★ item " + key + " skipped because pre item");
	    } else {
	      ret.push(r1);
	    }
	  }
	  return ret;
	};

	convertScheduleToGoogleGanttChartData2 = function(originalTaskItems, createdSchedule) {
	  var key, r, r1, ref, ret, returnTaskItemWithId, val;
	  ret = [initData];
	  returnTaskItemWithId = function(id) {
	    var it;
	    return ((function() {
	      var k, len, results;
	      results = [];
	      for (k = 0, len = originalTaskItems.length; k < len; k++) {
	        it = originalTaskItems[k];
	        if (it.id === id) {
	          results.push(it);
	        }
	      }
	      return results;
	    })())[0];
	  };
	  ref = createdSchedule.scheduledTasks;
	  for (key in ref) {
	    if (!hasProp.call(ref, key)) continue;
	    val = ref[key];
	    r = returnTaskItemWithId(key);
	    if (r == null) {
	      break;
	    }
	    r1 = [key, "[" + key + "] " + r.grp + "/" + r.name, r.grp, new Date(val.schedule[0].start), null, val.schedule[0].duration * 60 * 1000, Number(r.comp), null, null];
	    ret.push(r1);
	  }
	  return ret;
	};

	returnOption = function(_height, _width) {
	  return {
	    height: _height,
	    width: _width,
	    vAxis: {
	      gridlines: {
	        count: 1
	      }
	    },
	    legend: "none",
	    tooltip: {
	      isHtml: false,
	      trigger: "selection"
	    },
	    gantt: {
	      barCornerRadius: 1,
	      criticalPathEnabeld: true,
	      criticalPathStyle: {
	        strokeWidth: 3
	      },
	      arrow: {
	        angle: 100,
	        spaceAfter: 3,
	        length: 2,
	        width: 0.8,
	        radius: 10
	      },
	      barHeight: 7,
	      trackHeight: 16
	    }
	  };
	};

	drawGantt = function(_data, _option, targetDOM) {
	  return function() {
	    var chart, data, options;
	    data = new google.visualization.DataTable;
	    data.addColumn('string', 'Task ID');
	    data.addColumn('string', 'Task Name');
	    data.addColumn('string', 'Resource');
	    data.addColumn('date', 'Start Date');
	    data.addColumn('date', 'End Date');
	    data.addColumn('number', 'Duration');
	    data.addColumn('number', 'Percent Complete');
	    data.addColumn('string', 'Dependencies');
	    data.addColumn({
	      'type': 'string',
	      'role': 'tooltip'
	    });
	    data.addRows(_data);
	    options = _option;
	    chart = new google.visualization.Gantt(document.getElementById(targetDOM));
	    google.visualization.events.addListener(chart, "ready", (function() {
	      var arrayItemWithId, k, labelLists, labelP, len, m, match, x;
	      x = document.getElementById(targetDOM).childNodes[0].childNodes[0].childNodes[0].childNodes[8].getBBox().width;
	      console.log(x);
	      m = chart.yo.ea.innerText.replace(/\r?\n/g, "").match(bracketRegex);
	      labelP = function(ar) {
	        var ss, sy;
	        ss = moment(ar[3]).add(1, "d").format("YYYY/MM/DD");
	        sy = moment(ar[3]).add(ar[5] / 60 / 24 / 60 / 1000, "d").format("YYYY/MM/DD");
	        return ar[1] + "\n" + ss + " - " + sy + "\nduration: " + (ar[5] / 60 / 24 / 60 / 1000) + " day(s)\n%complete: " + ar[6];
	      };
	      arrayItemWithId = function(id) {
	        var dat, k, len;
	        for (k = 0, len = _data.length; k < len; k++) {
	          dat = _data[k];
	          if (dat[0] === id) {
	            return dat;
	          }
	        }
	      };
	      labelLists = [null];
	      for (k = 0, len = m.length; k < len; k++) {
	        match = m[k];
	        labelLists.push(labelP(arrayItemWithId(match.replace("[", "").replace("]", ""))));
	      }
	      return drawSVG(targetDOM + "_svg", _option.width, _option.gantt.trackHeight * _data.length, labelLists, x);
	    }));
	    chart.draw(data, options);
	  };
	};

	bracketRegex = /\[([^\[\]])*\]/g;

	drawLines = function(_target, _width, _height) {
	  var canvas, diff, diff2, drawVertical, finalPos, iniPos;
	  canvas = document.getElementById(_target);
	  canvas.width = _width;
	  canvas.height = _height;
	  iniPos = 200;
	  finalPos = _width;
	  diff = -(iniPos - finalPos) / 24;
	  diff2 = -(iniPos - finalPos) / 8;
	  drawVertical = function(_width, _pitch, _sep, _dot) {
	    var _ctx, i, k, ref, x;
	    _ctx = null;
	    _ctx = canvas.getContext('2d');
	    _ctx.lineWidth = _width;
	    _ctx.beginPath();
	    for (i = k = 0, ref = _sep; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
	      x = iniPos + _pitch * i;
	      _ctx.moveTo(x, 0);
	      _ctx.lineTo(x, _height);
	    }
	    return _ctx.stroke();
	  };
	  if (canvas.getContext != null) {
	    drawVertical(0.2, diff, 24, true);
	    return drawVertical(0.5, diff2, 8, false);
	  }
	};

	controls = {};

	__webpack_require__(121);

	drawSVG = function(_target, _width, _height, _labels, _lw) {
	  var clone, diff, diff2, draw, drawVertical, ele, finalPos, iniPos, it, j, k, len, newG, smallBox, textBox, titleEle;
	  ele = document.getElementById(_target);
	  clone = ele.cloneNode(false);
	  ele.parentNode.replaceChild(clone, ele);
	  draw = SVG(_target).size(_width, _height);
	  for (j = k = 0, len = _labels.length; k < len; j = ++k) {
	    it = _labels[j];
	    newG = smallBox = textBox = titleEle = null;
	    newG = draw.group();
	    if (it != null) {
	      newG.element("title").words("" + it);
	    }
	    smallBox = newG.rect(_width, 16).attr({
	      x: 0,
	      y: 16 * j
	    }).style({
	      opacity: 0
	    }).fill("Aqua");
	    smallBox.mouseover(function(e) {
	      return this.style({
	        "opacity": 0.2
	      });
	    });
	    smallBox.mouseout(function(e) {
	      return this.style({
	        "opacity": 0
	      });
	    });
	  }
	  iniPos = _lw + 32;
	  finalPos = _width;
	  diff = -(iniPos - finalPos) / 24;
	  diff2 = -(iniPos - finalPos) / 8;
	  drawVertical = function(_strokeWidth, _pitch, _sep, _dot) {
	    var i, line, n, ref, results, x;
	    results = [];
	    for (i = n = 0, ref = _sep; 0 <= ref ? n <= ref : n >= ref; i = 0 <= ref ? ++n : --n) {
	      line = null;
	      x = iniPos + _pitch * i;
	      line = draw.line(x, 0, x, _height);
	      results.push(line.attr({
	        "stroke-width": _strokeWidth
	      }));
	    }
	    return results;
	  };
	  drawVertical(0.2, diff, 24, true);
	  return drawVertical(0.5, diff2, 8, false);
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {//! moment.js
	//! version : 2.17.1
	//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
	//! license : MIT
	//! momentjs.com

	;(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    global.moment = factory()
	}(this, (function () { 'use strict';

	var hookCallback;

	function hooks () {
	    return hookCallback.apply(null, arguments);
	}

	// This is done to register the method called with moment()
	// without creating circular dependencies.
	function setHookCallback (callback) {
	    hookCallback = callback;
	}

	function isArray(input) {
	    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
	}

	function isObject(input) {
	    // IE8 will treat undefined and null as object if it wasn't for
	    // input != null
	    return input != null && Object.prototype.toString.call(input) === '[object Object]';
	}

	function isObjectEmpty(obj) {
	    var k;
	    for (k in obj) {
	        // even if its not own property I'd still call it non-empty
	        return false;
	    }
	    return true;
	}

	function isNumber(input) {
	    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
	}

	function isDate(input) {
	    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
	}

	function map(arr, fn) {
	    var res = [], i;
	    for (i = 0; i < arr.length; ++i) {
	        res.push(fn(arr[i], i));
	    }
	    return res;
	}

	function hasOwnProp(a, b) {
	    return Object.prototype.hasOwnProperty.call(a, b);
	}

	function extend(a, b) {
	    for (var i in b) {
	        if (hasOwnProp(b, i)) {
	            a[i] = b[i];
	        }
	    }

	    if (hasOwnProp(b, 'toString')) {
	        a.toString = b.toString;
	    }

	    if (hasOwnProp(b, 'valueOf')) {
	        a.valueOf = b.valueOf;
	    }

	    return a;
	}

	function createUTC (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, true).utc();
	}

	function defaultParsingFlags() {
	    // We need to deep clone this object.
	    return {
	        empty           : false,
	        unusedTokens    : [],
	        unusedInput     : [],
	        overflow        : -2,
	        charsLeftOver   : 0,
	        nullInput       : false,
	        invalidMonth    : null,
	        invalidFormat   : false,
	        userInvalidated : false,
	        iso             : false,
	        parsedDateParts : [],
	        meridiem        : null
	    };
	}

	function getParsingFlags(m) {
	    if (m._pf == null) {
	        m._pf = defaultParsingFlags();
	    }
	    return m._pf;
	}

	var some;
	if (Array.prototype.some) {
	    some = Array.prototype.some;
	} else {
	    some = function (fun) {
	        var t = Object(this);
	        var len = t.length >>> 0;

	        for (var i = 0; i < len; i++) {
	            if (i in t && fun.call(this, t[i], i, t)) {
	                return true;
	            }
	        }

	        return false;
	    };
	}

	var some$1 = some;

	function isValid(m) {
	    if (m._isValid == null) {
	        var flags = getParsingFlags(m);
	        var parsedParts = some$1.call(flags.parsedDateParts, function (i) {
	            return i != null;
	        });
	        var isNowValid = !isNaN(m._d.getTime()) &&
	            flags.overflow < 0 &&
	            !flags.empty &&
	            !flags.invalidMonth &&
	            !flags.invalidWeekday &&
	            !flags.nullInput &&
	            !flags.invalidFormat &&
	            !flags.userInvalidated &&
	            (!flags.meridiem || (flags.meridiem && parsedParts));

	        if (m._strict) {
	            isNowValid = isNowValid &&
	                flags.charsLeftOver === 0 &&
	                flags.unusedTokens.length === 0 &&
	                flags.bigHour === undefined;
	        }

	        if (Object.isFrozen == null || !Object.isFrozen(m)) {
	            m._isValid = isNowValid;
	        }
	        else {
	            return isNowValid;
	        }
	    }
	    return m._isValid;
	}

	function createInvalid (flags) {
	    var m = createUTC(NaN);
	    if (flags != null) {
	        extend(getParsingFlags(m), flags);
	    }
	    else {
	        getParsingFlags(m).userInvalidated = true;
	    }

	    return m;
	}

	function isUndefined(input) {
	    return input === void 0;
	}

	// Plugins that add properties should also add the key here (null value),
	// so we can properly clone ourselves.
	var momentProperties = hooks.momentProperties = [];

	function copyConfig(to, from) {
	    var i, prop, val;

	    if (!isUndefined(from._isAMomentObject)) {
	        to._isAMomentObject = from._isAMomentObject;
	    }
	    if (!isUndefined(from._i)) {
	        to._i = from._i;
	    }
	    if (!isUndefined(from._f)) {
	        to._f = from._f;
	    }
	    if (!isUndefined(from._l)) {
	        to._l = from._l;
	    }
	    if (!isUndefined(from._strict)) {
	        to._strict = from._strict;
	    }
	    if (!isUndefined(from._tzm)) {
	        to._tzm = from._tzm;
	    }
	    if (!isUndefined(from._isUTC)) {
	        to._isUTC = from._isUTC;
	    }
	    if (!isUndefined(from._offset)) {
	        to._offset = from._offset;
	    }
	    if (!isUndefined(from._pf)) {
	        to._pf = getParsingFlags(from);
	    }
	    if (!isUndefined(from._locale)) {
	        to._locale = from._locale;
	    }

	    if (momentProperties.length > 0) {
	        for (i in momentProperties) {
	            prop = momentProperties[i];
	            val = from[prop];
	            if (!isUndefined(val)) {
	                to[prop] = val;
	            }
	        }
	    }

	    return to;
	}

	var updateInProgress = false;

	// Moment prototype object
	function Moment(config) {
	    copyConfig(this, config);
	    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
	    if (!this.isValid()) {
	        this._d = new Date(NaN);
	    }
	    // Prevent infinite loop in case updateOffset creates new moment
	    // objects.
	    if (updateInProgress === false) {
	        updateInProgress = true;
	        hooks.updateOffset(this);
	        updateInProgress = false;
	    }
	}

	function isMoment (obj) {
	    return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
	}

	function absFloor (number) {
	    if (number < 0) {
	        // -0 -> 0
	        return Math.ceil(number) || 0;
	    } else {
	        return Math.floor(number);
	    }
	}

	function toInt(argumentForCoercion) {
	    var coercedNumber = +argumentForCoercion,
	        value = 0;

	    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
	        value = absFloor(coercedNumber);
	    }

	    return value;
	}

	// compare two arrays, return the number of differences
	function compareArrays(array1, array2, dontConvert) {
	    var len = Math.min(array1.length, array2.length),
	        lengthDiff = Math.abs(array1.length - array2.length),
	        diffs = 0,
	        i;
	    for (i = 0; i < len; i++) {
	        if ((dontConvert && array1[i] !== array2[i]) ||
	            (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
	            diffs++;
	        }
	    }
	    return diffs + lengthDiff;
	}

	function warn(msg) {
	    if (hooks.suppressDeprecationWarnings === false &&
	            (typeof console !==  'undefined') && console.warn) {
	        console.warn('Deprecation warning: ' + msg);
	    }
	}

	function deprecate(msg, fn) {
	    var firstTime = true;

	    return extend(function () {
	        if (hooks.deprecationHandler != null) {
	            hooks.deprecationHandler(null, msg);
	        }
	        if (firstTime) {
	            var args = [];
	            var arg;
	            for (var i = 0; i < arguments.length; i++) {
	                arg = '';
	                if (typeof arguments[i] === 'object') {
	                    arg += '\n[' + i + '] ';
	                    for (var key in arguments[0]) {
	                        arg += key + ': ' + arguments[0][key] + ', ';
	                    }
	                    arg = arg.slice(0, -2); // Remove trailing comma and space
	                } else {
	                    arg = arguments[i];
	                }
	                args.push(arg);
	            }
	            warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
	            firstTime = false;
	        }
	        return fn.apply(this, arguments);
	    }, fn);
	}

	var deprecations = {};

	function deprecateSimple(name, msg) {
	    if (hooks.deprecationHandler != null) {
	        hooks.deprecationHandler(name, msg);
	    }
	    if (!deprecations[name]) {
	        warn(msg);
	        deprecations[name] = true;
	    }
	}

	hooks.suppressDeprecationWarnings = false;
	hooks.deprecationHandler = null;

	function isFunction(input) {
	    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	}

	function set (config) {
	    var prop, i;
	    for (i in config) {
	        prop = config[i];
	        if (isFunction(prop)) {
	            this[i] = prop;
	        } else {
	            this['_' + i] = prop;
	        }
	    }
	    this._config = config;
	    // Lenient ordinal parsing accepts just a number in addition to
	    // number + (possibly) stuff coming from _ordinalParseLenient.
	    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
	}

	function mergeConfigs(parentConfig, childConfig) {
	    var res = extend({}, parentConfig), prop;
	    for (prop in childConfig) {
	        if (hasOwnProp(childConfig, prop)) {
	            if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
	                res[prop] = {};
	                extend(res[prop], parentConfig[prop]);
	                extend(res[prop], childConfig[prop]);
	            } else if (childConfig[prop] != null) {
	                res[prop] = childConfig[prop];
	            } else {
	                delete res[prop];
	            }
	        }
	    }
	    for (prop in parentConfig) {
	        if (hasOwnProp(parentConfig, prop) &&
	                !hasOwnProp(childConfig, prop) &&
	                isObject(parentConfig[prop])) {
	            // make sure changes to properties don't modify parent config
	            res[prop] = extend({}, res[prop]);
	        }
	    }
	    return res;
	}

	function Locale(config) {
	    if (config != null) {
	        this.set(config);
	    }
	}

	var keys;

	if (Object.keys) {
	    keys = Object.keys;
	} else {
	    keys = function (obj) {
	        var i, res = [];
	        for (i in obj) {
	            if (hasOwnProp(obj, i)) {
	                res.push(i);
	            }
	        }
	        return res;
	    };
	}

	var keys$1 = keys;

	var defaultCalendar = {
	    sameDay : '[Today at] LT',
	    nextDay : '[Tomorrow at] LT',
	    nextWeek : 'dddd [at] LT',
	    lastDay : '[Yesterday at] LT',
	    lastWeek : '[Last] dddd [at] LT',
	    sameElse : 'L'
	};

	function calendar (key, mom, now) {
	    var output = this._calendar[key] || this._calendar['sameElse'];
	    return isFunction(output) ? output.call(mom, now) : output;
	}

	var defaultLongDateFormat = {
	    LTS  : 'h:mm:ss A',
	    LT   : 'h:mm A',
	    L    : 'MM/DD/YYYY',
	    LL   : 'MMMM D, YYYY',
	    LLL  : 'MMMM D, YYYY h:mm A',
	    LLLL : 'dddd, MMMM D, YYYY h:mm A'
	};

	function longDateFormat (key) {
	    var format = this._longDateFormat[key],
	        formatUpper = this._longDateFormat[key.toUpperCase()];

	    if (format || !formatUpper) {
	        return format;
	    }

	    this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
	        return val.slice(1);
	    });

	    return this._longDateFormat[key];
	}

	var defaultInvalidDate = 'Invalid date';

	function invalidDate () {
	    return this._invalidDate;
	}

	var defaultOrdinal = '%d';
	var defaultOrdinalParse = /\d{1,2}/;

	function ordinal (number) {
	    return this._ordinal.replace('%d', number);
	}

	var defaultRelativeTime = {
	    future : 'in %s',
	    past   : '%s ago',
	    s  : 'a few seconds',
	    m  : 'a minute',
	    mm : '%d minutes',
	    h  : 'an hour',
	    hh : '%d hours',
	    d  : 'a day',
	    dd : '%d days',
	    M  : 'a month',
	    MM : '%d months',
	    y  : 'a year',
	    yy : '%d years'
	};

	function relativeTime (number, withoutSuffix, string, isFuture) {
	    var output = this._relativeTime[string];
	    return (isFunction(output)) ?
	        output(number, withoutSuffix, string, isFuture) :
	        output.replace(/%d/i, number);
	}

	function pastFuture (diff, output) {
	    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
	    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
	}

	var aliases = {};

	function addUnitAlias (unit, shorthand) {
	    var lowerCase = unit.toLowerCase();
	    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
	}

	function normalizeUnits(units) {
	    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
	}

	function normalizeObjectUnits(inputObject) {
	    var normalizedInput = {},
	        normalizedProp,
	        prop;

	    for (prop in inputObject) {
	        if (hasOwnProp(inputObject, prop)) {
	            normalizedProp = normalizeUnits(prop);
	            if (normalizedProp) {
	                normalizedInput[normalizedProp] = inputObject[prop];
	            }
	        }
	    }

	    return normalizedInput;
	}

	var priorities = {};

	function addUnitPriority(unit, priority) {
	    priorities[unit] = priority;
	}

	function getPrioritizedUnits(unitsObj) {
	    var units = [];
	    for (var u in unitsObj) {
	        units.push({unit: u, priority: priorities[u]});
	    }
	    units.sort(function (a, b) {
	        return a.priority - b.priority;
	    });
	    return units;
	}

	function makeGetSet (unit, keepTime) {
	    return function (value) {
	        if (value != null) {
	            set$1(this, unit, value);
	            hooks.updateOffset(this, keepTime);
	            return this;
	        } else {
	            return get(this, unit);
	        }
	    };
	}

	function get (mom, unit) {
	    return mom.isValid() ?
	        mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
	}

	function set$1 (mom, unit, value) {
	    if (mom.isValid()) {
	        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
	    }
	}

	// MOMENTS

	function stringGet (units) {
	    units = normalizeUnits(units);
	    if (isFunction(this[units])) {
	        return this[units]();
	    }
	    return this;
	}


	function stringSet (units, value) {
	    if (typeof units === 'object') {
	        units = normalizeObjectUnits(units);
	        var prioritized = getPrioritizedUnits(units);
	        for (var i = 0; i < prioritized.length; i++) {
	            this[prioritized[i].unit](units[prioritized[i].unit]);
	        }
	    } else {
	        units = normalizeUnits(units);
	        if (isFunction(this[units])) {
	            return this[units](value);
	        }
	    }
	    return this;
	}

	function zeroFill(number, targetLength, forceSign) {
	    var absNumber = '' + Math.abs(number),
	        zerosToFill = targetLength - absNumber.length,
	        sign = number >= 0;
	    return (sign ? (forceSign ? '+' : '') : '-') +
	        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
	}

	var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

	var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

	var formatFunctions = {};

	var formatTokenFunctions = {};

	// token:    'M'
	// padded:   ['MM', 2]
	// ordinal:  'Mo'
	// callback: function () { this.month() + 1 }
	function addFormatToken (token, padded, ordinal, callback) {
	    var func = callback;
	    if (typeof callback === 'string') {
	        func = function () {
	            return this[callback]();
	        };
	    }
	    if (token) {
	        formatTokenFunctions[token] = func;
	    }
	    if (padded) {
	        formatTokenFunctions[padded[0]] = function () {
	            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
	        };
	    }
	    if (ordinal) {
	        formatTokenFunctions[ordinal] = function () {
	            return this.localeData().ordinal(func.apply(this, arguments), token);
	        };
	    }
	}

	function removeFormattingTokens(input) {
	    if (input.match(/\[[\s\S]/)) {
	        return input.replace(/^\[|\]$/g, '');
	    }
	    return input.replace(/\\/g, '');
	}

	function makeFormatFunction(format) {
	    var array = format.match(formattingTokens), i, length;

	    for (i = 0, length = array.length; i < length; i++) {
	        if (formatTokenFunctions[array[i]]) {
	            array[i] = formatTokenFunctions[array[i]];
	        } else {
	            array[i] = removeFormattingTokens(array[i]);
	        }
	    }

	    return function (mom) {
	        var output = '', i;
	        for (i = 0; i < length; i++) {
	            output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
	        }
	        return output;
	    };
	}

	// format date using native date object
	function formatMoment(m, format) {
	    if (!m.isValid()) {
	        return m.localeData().invalidDate();
	    }

	    format = expandFormat(format, m.localeData());
	    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

	    return formatFunctions[format](m);
	}

	function expandFormat(format, locale) {
	    var i = 5;

	    function replaceLongDateFormatTokens(input) {
	        return locale.longDateFormat(input) || input;
	    }

	    localFormattingTokens.lastIndex = 0;
	    while (i >= 0 && localFormattingTokens.test(format)) {
	        format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
	        localFormattingTokens.lastIndex = 0;
	        i -= 1;
	    }

	    return format;
	}

	var match1         = /\d/;            //       0 - 9
	var match2         = /\d\d/;          //      00 - 99
	var match3         = /\d{3}/;         //     000 - 999
	var match4         = /\d{4}/;         //    0000 - 9999
	var match6         = /[+-]?\d{6}/;    // -999999 - 999999
	var match1to2      = /\d\d?/;         //       0 - 99
	var match3to4      = /\d\d\d\d?/;     //     999 - 9999
	var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
	var match1to3      = /\d{1,3}/;       //       0 - 999
	var match1to4      = /\d{1,4}/;       //       0 - 9999
	var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

	var matchUnsigned  = /\d+/;           //       0 - inf
	var matchSigned    = /[+-]?\d+/;      //    -inf - inf

	var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
	var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

	var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

	// any word (or two) characters or numbers including two/three word month in arabic.
	// includes scottish gaelic two word and hyphenated months
	var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


	var regexes = {};

	function addRegexToken (token, regex, strictRegex) {
	    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
	        return (isStrict && strictRegex) ? strictRegex : regex;
	    };
	}

	function getParseRegexForToken (token, config) {
	    if (!hasOwnProp(regexes, token)) {
	        return new RegExp(unescapeFormat(token));
	    }

	    return regexes[token](config._strict, config._locale);
	}

	// Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
	function unescapeFormat(s) {
	    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
	        return p1 || p2 || p3 || p4;
	    }));
	}

	function regexEscape(s) {
	    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}

	var tokens = {};

	function addParseToken (token, callback) {
	    var i, func = callback;
	    if (typeof token === 'string') {
	        token = [token];
	    }
	    if (isNumber(callback)) {
	        func = function (input, array) {
	            array[callback] = toInt(input);
	        };
	    }
	    for (i = 0; i < token.length; i++) {
	        tokens[token[i]] = func;
	    }
	}

	function addWeekParseToken (token, callback) {
	    addParseToken(token, function (input, array, config, token) {
	        config._w = config._w || {};
	        callback(input, config._w, config, token);
	    });
	}

	function addTimeToArrayFromToken(token, input, config) {
	    if (input != null && hasOwnProp(tokens, token)) {
	        tokens[token](input, config._a, config, token);
	    }
	}

	var YEAR = 0;
	var MONTH = 1;
	var DATE = 2;
	var HOUR = 3;
	var MINUTE = 4;
	var SECOND = 5;
	var MILLISECOND = 6;
	var WEEK = 7;
	var WEEKDAY = 8;

	var indexOf;

	if (Array.prototype.indexOf) {
	    indexOf = Array.prototype.indexOf;
	} else {
	    indexOf = function (o) {
	        // I know
	        var i;
	        for (i = 0; i < this.length; ++i) {
	            if (this[i] === o) {
	                return i;
	            }
	        }
	        return -1;
	    };
	}

	var indexOf$1 = indexOf;

	function daysInMonth(year, month) {
	    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
	}

	// FORMATTING

	addFormatToken('M', ['MM', 2], 'Mo', function () {
	    return this.month() + 1;
	});

	addFormatToken('MMM', 0, 0, function (format) {
	    return this.localeData().monthsShort(this, format);
	});

	addFormatToken('MMMM', 0, 0, function (format) {
	    return this.localeData().months(this, format);
	});

	// ALIASES

	addUnitAlias('month', 'M');

	// PRIORITY

	addUnitPriority('month', 8);

	// PARSING

	addRegexToken('M',    match1to2);
	addRegexToken('MM',   match1to2, match2);
	addRegexToken('MMM',  function (isStrict, locale) {
	    return locale.monthsShortRegex(isStrict);
	});
	addRegexToken('MMMM', function (isStrict, locale) {
	    return locale.monthsRegex(isStrict);
	});

	addParseToken(['M', 'MM'], function (input, array) {
	    array[MONTH] = toInt(input) - 1;
	});

	addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
	    var month = config._locale.monthsParse(input, token, config._strict);
	    // if we didn't find a month name, mark the date as invalid.
	    if (month != null) {
	        array[MONTH] = month;
	    } else {
	        getParsingFlags(config).invalidMonth = input;
	    }
	});

	// LOCALES

	var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
	var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
	function localeMonths (m, format) {
	    if (!m) {
	        return this._months;
	    }
	    return isArray(this._months) ? this._months[m.month()] :
	        this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
	}

	var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
	function localeMonthsShort (m, format) {
	    if (!m) {
	        return this._monthsShort;
	    }
	    return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
	        this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
	}

	function handleStrictParse(monthName, format, strict) {
	    var i, ii, mom, llc = monthName.toLocaleLowerCase();
	    if (!this._monthsParse) {
	        // this is not used
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	        for (i = 0; i < 12; ++i) {
	            mom = createUTC([2000, i]);
	            this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
	            this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
	        }
	    }

	    if (strict) {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'MMM') {
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._longMonthsParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortMonthsParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}

	function localeMonthsParse (monthName, format, strict) {
	    var i, mom, regex;

	    if (this._monthsParseExact) {
	        return handleStrictParse.call(this, monthName, format, strict);
	    }

	    if (!this._monthsParse) {
	        this._monthsParse = [];
	        this._longMonthsParse = [];
	        this._shortMonthsParse = [];
	    }

	    // TODO: add sorting
	    // Sorting makes sure if one month (or abbr) is a prefix of another
	    // see sorting in computeMonthsParse
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        if (strict && !this._longMonthsParse[i]) {
	            this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
	            this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
	        }
	        if (!strict && !this._monthsParse[i]) {
	            regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
	            this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
	            return i;
	        } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
	            return i;
	        } else if (!strict && this._monthsParse[i].test(monthName)) {
	            return i;
	        }
	    }
	}

	// MOMENTS

	function setMonth (mom, value) {
	    var dayOfMonth;

	    if (!mom.isValid()) {
	        // No op
	        return mom;
	    }

	    if (typeof value === 'string') {
	        if (/^\d+$/.test(value)) {
	            value = toInt(value);
	        } else {
	            value = mom.localeData().monthsParse(value);
	            // TODO: Another silent failure?
	            if (!isNumber(value)) {
	                return mom;
	            }
	        }
	    }

	    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
	    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
	    return mom;
	}

	function getSetMonth (value) {
	    if (value != null) {
	        setMonth(this, value);
	        hooks.updateOffset(this, true);
	        return this;
	    } else {
	        return get(this, 'Month');
	    }
	}

	function getDaysInMonth () {
	    return daysInMonth(this.year(), this.month());
	}

	var defaultMonthsShortRegex = matchWord;
	function monthsShortRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsShortStrictRegex;
	        } else {
	            return this._monthsShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsShortRegex')) {
	            this._monthsShortRegex = defaultMonthsShortRegex;
	        }
	        return this._monthsShortStrictRegex && isStrict ?
	            this._monthsShortStrictRegex : this._monthsShortRegex;
	    }
	}

	var defaultMonthsRegex = matchWord;
	function monthsRegex (isStrict) {
	    if (this._monthsParseExact) {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            computeMonthsParse.call(this);
	        }
	        if (isStrict) {
	            return this._monthsStrictRegex;
	        } else {
	            return this._monthsRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_monthsRegex')) {
	            this._monthsRegex = defaultMonthsRegex;
	        }
	        return this._monthsStrictRegex && isStrict ?
	            this._monthsStrictRegex : this._monthsRegex;
	    }
	}

	function computeMonthsParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }

	    var shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom;
	    for (i = 0; i < 12; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, i]);
	        shortPieces.push(this.monthsShort(mom, ''));
	        longPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.months(mom, ''));
	        mixedPieces.push(this.monthsShort(mom, ''));
	    }
	    // Sorting makes sure if one month (or abbr) is a prefix of another it
	    // will match the longer piece.
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 12; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	    }
	    for (i = 0; i < 24; i++) {
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }

	    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._monthsShortRegex = this._monthsRegex;
	    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	}

	// FORMATTING

	addFormatToken('Y', 0, 0, function () {
	    var y = this.year();
	    return y <= 9999 ? '' + y : '+' + y;
	});

	addFormatToken(0, ['YY', 2], 0, function () {
	    return this.year() % 100;
	});

	addFormatToken(0, ['YYYY',   4],       0, 'year');
	addFormatToken(0, ['YYYYY',  5],       0, 'year');
	addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

	// ALIASES

	addUnitAlias('year', 'y');

	// PRIORITIES

	addUnitPriority('year', 1);

	// PARSING

	addRegexToken('Y',      matchSigned);
	addRegexToken('YY',     match1to2, match2);
	addRegexToken('YYYY',   match1to4, match4);
	addRegexToken('YYYYY',  match1to6, match6);
	addRegexToken('YYYYYY', match1to6, match6);

	addParseToken(['YYYYY', 'YYYYYY'], YEAR);
	addParseToken('YYYY', function (input, array) {
	    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
	});
	addParseToken('YY', function (input, array) {
	    array[YEAR] = hooks.parseTwoDigitYear(input);
	});
	addParseToken('Y', function (input, array) {
	    array[YEAR] = parseInt(input, 10);
	});

	// HELPERS

	function daysInYear(year) {
	    return isLeapYear(year) ? 366 : 365;
	}

	function isLeapYear(year) {
	    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}

	// HOOKS

	hooks.parseTwoDigitYear = function (input) {
	    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
	};

	// MOMENTS

	var getSetYear = makeGetSet('FullYear', true);

	function getIsLeapYear () {
	    return isLeapYear(this.year());
	}

	function createDate (y, m, d, h, M, s, ms) {
	    //can't just apply() to create a date:
	    //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
	    var date = new Date(y, m, d, h, M, s, ms);

	    //the date constructor remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
	        date.setFullYear(y);
	    }
	    return date;
	}

	function createUTCDate (y) {
	    var date = new Date(Date.UTC.apply(null, arguments));

	    //the Date.UTC function remaps years 0-99 to 1900-1999
	    if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
	        date.setUTCFullYear(y);
	    }
	    return date;
	}

	// start-of-first-week - start-of-year
	function firstWeekOffset(year, dow, doy) {
	    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
	        fwd = 7 + dow - doy,
	        // first-week day local weekday -- which local weekday is fwd
	        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

	    return -fwdlw + fwd - 1;
	}

	//http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
	function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
	    var localWeekday = (7 + weekday - dow) % 7,
	        weekOffset = firstWeekOffset(year, dow, doy),
	        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
	        resYear, resDayOfYear;

	    if (dayOfYear <= 0) {
	        resYear = year - 1;
	        resDayOfYear = daysInYear(resYear) + dayOfYear;
	    } else if (dayOfYear > daysInYear(year)) {
	        resYear = year + 1;
	        resDayOfYear = dayOfYear - daysInYear(year);
	    } else {
	        resYear = year;
	        resDayOfYear = dayOfYear;
	    }

	    return {
	        year: resYear,
	        dayOfYear: resDayOfYear
	    };
	}

	function weekOfYear(mom, dow, doy) {
	    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
	        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
	        resWeek, resYear;

	    if (week < 1) {
	        resYear = mom.year() - 1;
	        resWeek = week + weeksInYear(resYear, dow, doy);
	    } else if (week > weeksInYear(mom.year(), dow, doy)) {
	        resWeek = week - weeksInYear(mom.year(), dow, doy);
	        resYear = mom.year() + 1;
	    } else {
	        resYear = mom.year();
	        resWeek = week;
	    }

	    return {
	        week: resWeek,
	        year: resYear
	    };
	}

	function weeksInYear(year, dow, doy) {
	    var weekOffset = firstWeekOffset(year, dow, doy),
	        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
	    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
	}

	// FORMATTING

	addFormatToken('w', ['ww', 2], 'wo', 'week');
	addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

	// ALIASES

	addUnitAlias('week', 'w');
	addUnitAlias('isoWeek', 'W');

	// PRIORITIES

	addUnitPriority('week', 5);
	addUnitPriority('isoWeek', 5);

	// PARSING

	addRegexToken('w',  match1to2);
	addRegexToken('ww', match1to2, match2);
	addRegexToken('W',  match1to2);
	addRegexToken('WW', match1to2, match2);

	addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
	    week[token.substr(0, 1)] = toInt(input);
	});

	// HELPERS

	// LOCALES

	function localeWeek (mom) {
	    return weekOfYear(mom, this._week.dow, this._week.doy).week;
	}

	var defaultLocaleWeek = {
	    dow : 0, // Sunday is the first day of the week.
	    doy : 6  // The week that contains Jan 1st is the first week of the year.
	};

	function localeFirstDayOfWeek () {
	    return this._week.dow;
	}

	function localeFirstDayOfYear () {
	    return this._week.doy;
	}

	// MOMENTS

	function getSetWeek (input) {
	    var week = this.localeData().week(this);
	    return input == null ? week : this.add((input - week) * 7, 'd');
	}

	function getSetISOWeek (input) {
	    var week = weekOfYear(this, 1, 4).week;
	    return input == null ? week : this.add((input - week) * 7, 'd');
	}

	// FORMATTING

	addFormatToken('d', 0, 'do', 'day');

	addFormatToken('dd', 0, 0, function (format) {
	    return this.localeData().weekdaysMin(this, format);
	});

	addFormatToken('ddd', 0, 0, function (format) {
	    return this.localeData().weekdaysShort(this, format);
	});

	addFormatToken('dddd', 0, 0, function (format) {
	    return this.localeData().weekdays(this, format);
	});

	addFormatToken('e', 0, 0, 'weekday');
	addFormatToken('E', 0, 0, 'isoWeekday');

	// ALIASES

	addUnitAlias('day', 'd');
	addUnitAlias('weekday', 'e');
	addUnitAlias('isoWeekday', 'E');

	// PRIORITY
	addUnitPriority('day', 11);
	addUnitPriority('weekday', 11);
	addUnitPriority('isoWeekday', 11);

	// PARSING

	addRegexToken('d',    match1to2);
	addRegexToken('e',    match1to2);
	addRegexToken('E',    match1to2);
	addRegexToken('dd',   function (isStrict, locale) {
	    return locale.weekdaysMinRegex(isStrict);
	});
	addRegexToken('ddd',   function (isStrict, locale) {
	    return locale.weekdaysShortRegex(isStrict);
	});
	addRegexToken('dddd',   function (isStrict, locale) {
	    return locale.weekdaysRegex(isStrict);
	});

	addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
	    var weekday = config._locale.weekdaysParse(input, token, config._strict);
	    // if we didn't get a weekday name, mark the date as invalid
	    if (weekday != null) {
	        week.d = weekday;
	    } else {
	        getParsingFlags(config).invalidWeekday = input;
	    }
	});

	addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
	    week[token] = toInt(input);
	});

	// HELPERS

	function parseWeekday(input, locale) {
	    if (typeof input !== 'string') {
	        return input;
	    }

	    if (!isNaN(input)) {
	        return parseInt(input, 10);
	    }

	    input = locale.weekdaysParse(input);
	    if (typeof input === 'number') {
	        return input;
	    }

	    return null;
	}

	function parseIsoWeekday(input, locale) {
	    if (typeof input === 'string') {
	        return locale.weekdaysParse(input) % 7 || 7;
	    }
	    return isNaN(input) ? null : input;
	}

	// LOCALES

	var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
	function localeWeekdays (m, format) {
	    if (!m) {
	        return this._weekdays;
	    }
	    return isArray(this._weekdays) ? this._weekdays[m.day()] :
	        this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
	}

	var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
	function localeWeekdaysShort (m) {
	    return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
	}

	var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
	function localeWeekdaysMin (m) {
	    return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
	}

	function handleStrictParse$1(weekdayName, format, strict) {
	    var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._minWeekdaysParse = [];

	        for (i = 0; i < 7; ++i) {
	            mom = createUTC([2000, 1]).day(i);
	            this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
	            this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
	            this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
	        }
	    }

	    if (strict) {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    } else {
	        if (format === 'dddd') {
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else if (format === 'ddd') {
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        } else {
	            ii = indexOf$1.call(this._minWeekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._weekdaysParse, llc);
	            if (ii !== -1) {
	                return ii;
	            }
	            ii = indexOf$1.call(this._shortWeekdaysParse, llc);
	            return ii !== -1 ? ii : null;
	        }
	    }
	}

	function localeWeekdaysParse (weekdayName, format, strict) {
	    var i, mom, regex;

	    if (this._weekdaysParseExact) {
	        return handleStrictParse$1.call(this, weekdayName, format, strict);
	    }

	    if (!this._weekdaysParse) {
	        this._weekdaysParse = [];
	        this._minWeekdaysParse = [];
	        this._shortWeekdaysParse = [];
	        this._fullWeekdaysParse = [];
	    }

	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already

	        mom = createUTC([2000, 1]).day(i);
	        if (strict && !this._fullWeekdaysParse[i]) {
	            this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
	            this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
	            this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
	        }
	        if (!this._weekdaysParse[i]) {
	            regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
	            this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
	        }
	        // test the regex
	        if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
	            return i;
	        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
	            return i;
	        }
	    }
	}

	// MOMENTS

	function getSetDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
	    if (input != null) {
	        input = parseWeekday(input, this.localeData());
	        return this.add(input - day, 'd');
	    } else {
	        return day;
	    }
	}

	function getSetLocaleDayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
	    return input == null ? weekday : this.add(input - weekday, 'd');
	}

	function getSetISODayOfWeek (input) {
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }

	    // behaves the same as moment#day except
	    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
	    // as a setter, sunday should belong to the previous week.

	    if (input != null) {
	        var weekday = parseIsoWeekday(input, this.localeData());
	        return this.day(this.day() % 7 ? weekday : weekday - 7);
	    } else {
	        return this.day() || 7;
	    }
	}

	var defaultWeekdaysRegex = matchWord;
	function weekdaysRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysStrictRegex;
	        } else {
	            return this._weekdaysRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            this._weekdaysRegex = defaultWeekdaysRegex;
	        }
	        return this._weekdaysStrictRegex && isStrict ?
	            this._weekdaysStrictRegex : this._weekdaysRegex;
	    }
	}

	var defaultWeekdaysShortRegex = matchWord;
	function weekdaysShortRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysShortStrictRegex;
	        } else {
	            return this._weekdaysShortRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysShortRegex')) {
	            this._weekdaysShortRegex = defaultWeekdaysShortRegex;
	        }
	        return this._weekdaysShortStrictRegex && isStrict ?
	            this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
	    }
	}

	var defaultWeekdaysMinRegex = matchWord;
	function weekdaysMinRegex (isStrict) {
	    if (this._weekdaysParseExact) {
	        if (!hasOwnProp(this, '_weekdaysRegex')) {
	            computeWeekdaysParse.call(this);
	        }
	        if (isStrict) {
	            return this._weekdaysMinStrictRegex;
	        } else {
	            return this._weekdaysMinRegex;
	        }
	    } else {
	        if (!hasOwnProp(this, '_weekdaysMinRegex')) {
	            this._weekdaysMinRegex = defaultWeekdaysMinRegex;
	        }
	        return this._weekdaysMinStrictRegex && isStrict ?
	            this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
	    }
	}


	function computeWeekdaysParse () {
	    function cmpLenRev(a, b) {
	        return b.length - a.length;
	    }

	    var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
	        i, mom, minp, shortp, longp;
	    for (i = 0; i < 7; i++) {
	        // make the regex if we don't have it already
	        mom = createUTC([2000, 1]).day(i);
	        minp = this.weekdaysMin(mom, '');
	        shortp = this.weekdaysShort(mom, '');
	        longp = this.weekdays(mom, '');
	        minPieces.push(minp);
	        shortPieces.push(shortp);
	        longPieces.push(longp);
	        mixedPieces.push(minp);
	        mixedPieces.push(shortp);
	        mixedPieces.push(longp);
	    }
	    // Sorting makes sure if one weekday (or abbr) is a prefix of another it
	    // will match the longer piece.
	    minPieces.sort(cmpLenRev);
	    shortPieces.sort(cmpLenRev);
	    longPieces.sort(cmpLenRev);
	    mixedPieces.sort(cmpLenRev);
	    for (i = 0; i < 7; i++) {
	        shortPieces[i] = regexEscape(shortPieces[i]);
	        longPieces[i] = regexEscape(longPieces[i]);
	        mixedPieces[i] = regexEscape(mixedPieces[i]);
	    }

	    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
	    this._weekdaysShortRegex = this._weekdaysRegex;
	    this._weekdaysMinRegex = this._weekdaysRegex;

	    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
	    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
	    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
	}

	// FORMATTING

	function hFormat() {
	    return this.hours() % 12 || 12;
	}

	function kFormat() {
	    return this.hours() || 24;
	}

	addFormatToken('H', ['HH', 2], 0, 'hour');
	addFormatToken('h', ['hh', 2], 0, hFormat);
	addFormatToken('k', ['kk', 2], 0, kFormat);

	addFormatToken('hmm', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
	});

	addFormatToken('hmmss', 0, 0, function () {
	    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});

	addFormatToken('Hmm', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2);
	});

	addFormatToken('Hmmss', 0, 0, function () {
	    return '' + this.hours() + zeroFill(this.minutes(), 2) +
	        zeroFill(this.seconds(), 2);
	});

	function meridiem (token, lowercase) {
	    addFormatToken(token, 0, 0, function () {
	        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
	    });
	}

	meridiem('a', true);
	meridiem('A', false);

	// ALIASES

	addUnitAlias('hour', 'h');

	// PRIORITY
	addUnitPriority('hour', 13);

	// PARSING

	function matchMeridiem (isStrict, locale) {
	    return locale._meridiemParse;
	}

	addRegexToken('a',  matchMeridiem);
	addRegexToken('A',  matchMeridiem);
	addRegexToken('H',  match1to2);
	addRegexToken('h',  match1to2);
	addRegexToken('HH', match1to2, match2);
	addRegexToken('hh', match1to2, match2);

	addRegexToken('hmm', match3to4);
	addRegexToken('hmmss', match5to6);
	addRegexToken('Hmm', match3to4);
	addRegexToken('Hmmss', match5to6);

	addParseToken(['H', 'HH'], HOUR);
	addParseToken(['a', 'A'], function (input, array, config) {
	    config._isPm = config._locale.isPM(input);
	    config._meridiem = input;
	});
	addParseToken(['h', 'hh'], function (input, array, config) {
	    array[HOUR] = toInt(input);
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	    getParsingFlags(config).bigHour = true;
	});
	addParseToken('Hmm', function (input, array, config) {
	    var pos = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos));
	    array[MINUTE] = toInt(input.substr(pos));
	});
	addParseToken('Hmmss', function (input, array, config) {
	    var pos1 = input.length - 4;
	    var pos2 = input.length - 2;
	    array[HOUR] = toInt(input.substr(0, pos1));
	    array[MINUTE] = toInt(input.substr(pos1, 2));
	    array[SECOND] = toInt(input.substr(pos2));
	});

	// LOCALES

	function localeIsPM (input) {
	    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
	    // Using charAt should be more compatible.
	    return ((input + '').toLowerCase().charAt(0) === 'p');
	}

	var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
	function localeMeridiem (hours, minutes, isLower) {
	    if (hours > 11) {
	        return isLower ? 'pm' : 'PM';
	    } else {
	        return isLower ? 'am' : 'AM';
	    }
	}


	// MOMENTS

	// Setting the hour should keep the time, because the user explicitly
	// specified which hour he wants. So trying to maintain the same hour (in
	// a new timezone) makes sense. Adding/subtracting hours does not follow
	// this rule.
	var getSetHour = makeGetSet('Hours', true);

	// months
	// week
	// weekdays
	// meridiem
	var baseConfig = {
	    calendar: defaultCalendar,
	    longDateFormat: defaultLongDateFormat,
	    invalidDate: defaultInvalidDate,
	    ordinal: defaultOrdinal,
	    ordinalParse: defaultOrdinalParse,
	    relativeTime: defaultRelativeTime,

	    months: defaultLocaleMonths,
	    monthsShort: defaultLocaleMonthsShort,

	    week: defaultLocaleWeek,

	    weekdays: defaultLocaleWeekdays,
	    weekdaysMin: defaultLocaleWeekdaysMin,
	    weekdaysShort: defaultLocaleWeekdaysShort,

	    meridiemParse: defaultLocaleMeridiemParse
	};

	// internal storage for locale config files
	var locales = {};
	var localeFamilies = {};
	var globalLocale;

	function normalizeLocale(key) {
	    return key ? key.toLowerCase().replace('_', '-') : key;
	}

	// pick the locale from the array
	// try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
	// substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
	function chooseLocale(names) {
	    var i = 0, j, next, locale, split;

	    while (i < names.length) {
	        split = normalizeLocale(names[i]).split('-');
	        j = split.length;
	        next = normalizeLocale(names[i + 1]);
	        next = next ? next.split('-') : null;
	        while (j > 0) {
	            locale = loadLocale(split.slice(0, j).join('-'));
	            if (locale) {
	                return locale;
	            }
	            if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
	                //the next array item is better than a shallower substring of this one
	                break;
	            }
	            j--;
	        }
	        i++;
	    }
	    return null;
	}

	function loadLocale(name) {
	    var oldLocale = null;
	    // TODO: Find a better way to register and load all the locales in Node
	    if (!locales[name] && (typeof module !== 'undefined') &&
	            module && module.exports) {
	        try {
	            oldLocale = globalLocale._abbr;
	            __webpack_require__(115)("./" + name);
	            // because defineLocale currently also sets the global locale, we
	            // want to undo that for lazy loaded locales
	            getSetGlobalLocale(oldLocale);
	        } catch (e) { }
	    }
	    return locales[name];
	}

	// This function will load locale and then set the global locale.  If
	// no arguments are passed in, it will simply return the current global
	// locale key.
	function getSetGlobalLocale (key, values) {
	    var data;
	    if (key) {
	        if (isUndefined(values)) {
	            data = getLocale(key);
	        }
	        else {
	            data = defineLocale(key, values);
	        }

	        if (data) {
	            // moment.duration._locale = moment._locale = data;
	            globalLocale = data;
	        }
	    }

	    return globalLocale._abbr;
	}

	function defineLocale (name, config) {
	    if (config !== null) {
	        var parentConfig = baseConfig;
	        config.abbr = name;
	        if (locales[name] != null) {
	            deprecateSimple('defineLocaleOverride',
	                    'use moment.updateLocale(localeName, config) to change ' +
	                    'an existing locale. moment.defineLocale(localeName, ' +
	                    'config) should only be used for creating a new locale ' +
	                    'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
	            parentConfig = locales[name]._config;
	        } else if (config.parentLocale != null) {
	            if (locales[config.parentLocale] != null) {
	                parentConfig = locales[config.parentLocale]._config;
	            } else {
	                if (!localeFamilies[config.parentLocale]) {
	                    localeFamilies[config.parentLocale] = [];
	                }
	                localeFamilies[config.parentLocale].push({
	                    name: name,
	                    config: config
	                });
	                return null;
	            }
	        }
	        locales[name] = new Locale(mergeConfigs(parentConfig, config));

	        if (localeFamilies[name]) {
	            localeFamilies[name].forEach(function (x) {
	                defineLocale(x.name, x.config);
	            });
	        }

	        // backwards compat for now: also set the locale
	        // make sure we set the locale AFTER all child locales have been
	        // created, so we won't end up with the child locale set.
	        getSetGlobalLocale(name);


	        return locales[name];
	    } else {
	        // useful for testing
	        delete locales[name];
	        return null;
	    }
	}

	function updateLocale(name, config) {
	    if (config != null) {
	        var locale, parentConfig = baseConfig;
	        // MERGE
	        if (locales[name] != null) {
	            parentConfig = locales[name]._config;
	        }
	        config = mergeConfigs(parentConfig, config);
	        locale = new Locale(config);
	        locale.parentLocale = locales[name];
	        locales[name] = locale;

	        // backwards compat for now: also set the locale
	        getSetGlobalLocale(name);
	    } else {
	        // pass null for config to unupdate, useful for tests
	        if (locales[name] != null) {
	            if (locales[name].parentLocale != null) {
	                locales[name] = locales[name].parentLocale;
	            } else if (locales[name] != null) {
	                delete locales[name];
	            }
	        }
	    }
	    return locales[name];
	}

	// returns locale data
	function getLocale (key) {
	    var locale;

	    if (key && key._locale && key._locale._abbr) {
	        key = key._locale._abbr;
	    }

	    if (!key) {
	        return globalLocale;
	    }

	    if (!isArray(key)) {
	        //short-circuit everything else
	        locale = loadLocale(key);
	        if (locale) {
	            return locale;
	        }
	        key = [key];
	    }

	    return chooseLocale(key);
	}

	function listLocales() {
	    return keys$1(locales);
	}

	function checkOverflow (m) {
	    var overflow;
	    var a = m._a;

	    if (a && getParsingFlags(m).overflow === -2) {
	        overflow =
	            a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
	            a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
	            a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
	            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
	            a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
	            a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
	            -1;

	        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
	            overflow = DATE;
	        }
	        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
	            overflow = WEEK;
	        }
	        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
	            overflow = WEEKDAY;
	        }

	        getParsingFlags(m).overflow = overflow;
	    }

	    return m;
	}

	// iso 8601 regex
	// 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
	var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
	var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

	var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

	var isoDates = [
	    ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
	    ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
	    ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
	    ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
	    ['YYYY-DDD', /\d{4}-\d{3}/],
	    ['YYYY-MM', /\d{4}-\d\d/, false],
	    ['YYYYYYMMDD', /[+-]\d{10}/],
	    ['YYYYMMDD', /\d{8}/],
	    // YYYYMM is NOT allowed by the standard
	    ['GGGG[W]WWE', /\d{4}W\d{3}/],
	    ['GGGG[W]WW', /\d{4}W\d{2}/, false],
	    ['YYYYDDD', /\d{7}/]
	];

	// iso time formats and regexes
	var isoTimes = [
	    ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
	    ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
	    ['HH:mm:ss', /\d\d:\d\d:\d\d/],
	    ['HH:mm', /\d\d:\d\d/],
	    ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
	    ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
	    ['HHmmss', /\d\d\d\d\d\d/],
	    ['HHmm', /\d\d\d\d/],
	    ['HH', /\d\d/]
	];

	var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

	// date from iso format
	function configFromISO(config) {
	    var i, l,
	        string = config._i,
	        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
	        allowTime, dateFormat, timeFormat, tzFormat;

	    if (match) {
	        getParsingFlags(config).iso = true;

	        for (i = 0, l = isoDates.length; i < l; i++) {
	            if (isoDates[i][1].exec(match[1])) {
	                dateFormat = isoDates[i][0];
	                allowTime = isoDates[i][2] !== false;
	                break;
	            }
	        }
	        if (dateFormat == null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[3]) {
	            for (i = 0, l = isoTimes.length; i < l; i++) {
	                if (isoTimes[i][1].exec(match[3])) {
	                    // match[2] should be 'T' or space
	                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
	                    break;
	                }
	            }
	            if (timeFormat == null) {
	                config._isValid = false;
	                return;
	            }
	        }
	        if (!allowTime && timeFormat != null) {
	            config._isValid = false;
	            return;
	        }
	        if (match[4]) {
	            if (tzRegex.exec(match[4])) {
	                tzFormat = 'Z';
	            } else {
	                config._isValid = false;
	                return;
	            }
	        }
	        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
	        configFromStringAndFormat(config);
	    } else {
	        config._isValid = false;
	    }
	}

	// date from iso format or fallback
	function configFromString(config) {
	    var matched = aspNetJsonRegex.exec(config._i);

	    if (matched !== null) {
	        config._d = new Date(+matched[1]);
	        return;
	    }

	    configFromISO(config);
	    if (config._isValid === false) {
	        delete config._isValid;
	        hooks.createFromInputFallback(config);
	    }
	}

	hooks.createFromInputFallback = deprecate(
	    'value provided is not in a recognized ISO format. moment construction falls back to js Date(), ' +
	    'which is not reliable across all browsers and versions. Non ISO date formats are ' +
	    'discouraged and will be removed in an upcoming major release. Please refer to ' +
	    'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
	    function (config) {
	        config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
	    }
	);

	// Pick the first defined of two or three arguments.
	function defaults(a, b, c) {
	    if (a != null) {
	        return a;
	    }
	    if (b != null) {
	        return b;
	    }
	    return c;
	}

	function currentDateArray(config) {
	    // hooks is actually the exported moment object
	    var nowValue = new Date(hooks.now());
	    if (config._useUTC) {
	        return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
	    }
	    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
	}

	// convert an array to a date.
	// the array should mirror the parameters below
	// note: all values past the year are optional and will default to the lowest possible value.
	// [year, month, day , hour, minute, second, millisecond]
	function configFromArray (config) {
	    var i, date, input = [], currentDate, yearToUse;

	    if (config._d) {
	        return;
	    }

	    currentDate = currentDateArray(config);

	    //compute day of the year from weeks and weekdays
	    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
	        dayOfYearFromWeekInfo(config);
	    }

	    //if the day of the year is set, figure out what it is
	    if (config._dayOfYear) {
	        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

	        if (config._dayOfYear > daysInYear(yearToUse)) {
	            getParsingFlags(config)._overflowDayOfYear = true;
	        }

	        date = createUTCDate(yearToUse, 0, config._dayOfYear);
	        config._a[MONTH] = date.getUTCMonth();
	        config._a[DATE] = date.getUTCDate();
	    }

	    // Default to current date.
	    // * if no year, month, day of month are given, default to today
	    // * if day of month is given, default month and year
	    // * if month is given, default only year
	    // * if year is given, don't default anything
	    for (i = 0; i < 3 && config._a[i] == null; ++i) {
	        config._a[i] = input[i] = currentDate[i];
	    }

	    // Zero out whatever was not defaulted, including time
	    for (; i < 7; i++) {
	        config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
	    }

	    // Check for 24:00:00.000
	    if (config._a[HOUR] === 24 &&
	            config._a[MINUTE] === 0 &&
	            config._a[SECOND] === 0 &&
	            config._a[MILLISECOND] === 0) {
	        config._nextDay = true;
	        config._a[HOUR] = 0;
	    }

	    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
	    // Apply timezone offset from input. The actual utcOffset can be changed
	    // with parseZone.
	    if (config._tzm != null) {
	        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
	    }

	    if (config._nextDay) {
	        config._a[HOUR] = 24;
	    }
	}

	function dayOfYearFromWeekInfo(config) {
	    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

	    w = config._w;
	    if (w.GG != null || w.W != null || w.E != null) {
	        dow = 1;
	        doy = 4;

	        // TODO: We need to take the current isoWeekYear, but that depends on
	        // how we interpret now (local, utc, fixed offset). So create
	        // a now version of current config (take local/utc/offset flags, and
	        // create now).
	        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
	        week = defaults(w.W, 1);
	        weekday = defaults(w.E, 1);
	        if (weekday < 1 || weekday > 7) {
	            weekdayOverflow = true;
	        }
	    } else {
	        dow = config._locale._week.dow;
	        doy = config._locale._week.doy;

	        var curWeek = weekOfYear(createLocal(), dow, doy);

	        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

	        // Default to current week.
	        week = defaults(w.w, curWeek.week);

	        if (w.d != null) {
	            // weekday -- low day numbers are considered next week
	            weekday = w.d;
	            if (weekday < 0 || weekday > 6) {
	                weekdayOverflow = true;
	            }
	        } else if (w.e != null) {
	            // local weekday -- counting starts from begining of week
	            weekday = w.e + dow;
	            if (w.e < 0 || w.e > 6) {
	                weekdayOverflow = true;
	            }
	        } else {
	            // default to begining of week
	            weekday = dow;
	        }
	    }
	    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
	        getParsingFlags(config)._overflowWeeks = true;
	    } else if (weekdayOverflow != null) {
	        getParsingFlags(config)._overflowWeekday = true;
	    } else {
	        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
	        config._a[YEAR] = temp.year;
	        config._dayOfYear = temp.dayOfYear;
	    }
	}

	// constant that refers to the ISO standard
	hooks.ISO_8601 = function () {};

	// date from string and format string
	function configFromStringAndFormat(config) {
	    // TODO: Move this to another part of the creation flow to prevent circular deps
	    if (config._f === hooks.ISO_8601) {
	        configFromISO(config);
	        return;
	    }

	    config._a = [];
	    getParsingFlags(config).empty = true;

	    // This array is used to make a Date, either with `new Date` or `Date.UTC`
	    var string = '' + config._i,
	        i, parsedInput, tokens, token, skipped,
	        stringLength = string.length,
	        totalParsedInputLength = 0;

	    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

	    for (i = 0; i < tokens.length; i++) {
	        token = tokens[i];
	        parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
	        // console.log('token', token, 'parsedInput', parsedInput,
	        //         'regex', getParseRegexForToken(token, config));
	        if (parsedInput) {
	            skipped = string.substr(0, string.indexOf(parsedInput));
	            if (skipped.length > 0) {
	                getParsingFlags(config).unusedInput.push(skipped);
	            }
	            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
	            totalParsedInputLength += parsedInput.length;
	        }
	        // don't parse if it's not a known token
	        if (formatTokenFunctions[token]) {
	            if (parsedInput) {
	                getParsingFlags(config).empty = false;
	            }
	            else {
	                getParsingFlags(config).unusedTokens.push(token);
	            }
	            addTimeToArrayFromToken(token, parsedInput, config);
	        }
	        else if (config._strict && !parsedInput) {
	            getParsingFlags(config).unusedTokens.push(token);
	        }
	    }

	    // add remaining unparsed input length to the string
	    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
	    if (string.length > 0) {
	        getParsingFlags(config).unusedInput.push(string);
	    }

	    // clear _12h flag if hour is <= 12
	    if (config._a[HOUR] <= 12 &&
	        getParsingFlags(config).bigHour === true &&
	        config._a[HOUR] > 0) {
	        getParsingFlags(config).bigHour = undefined;
	    }

	    getParsingFlags(config).parsedDateParts = config._a.slice(0);
	    getParsingFlags(config).meridiem = config._meridiem;
	    // handle meridiem
	    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

	    configFromArray(config);
	    checkOverflow(config);
	}


	function meridiemFixWrap (locale, hour, meridiem) {
	    var isPm;

	    if (meridiem == null) {
	        // nothing to do
	        return hour;
	    }
	    if (locale.meridiemHour != null) {
	        return locale.meridiemHour(hour, meridiem);
	    } else if (locale.isPM != null) {
	        // Fallback
	        isPm = locale.isPM(meridiem);
	        if (isPm && hour < 12) {
	            hour += 12;
	        }
	        if (!isPm && hour === 12) {
	            hour = 0;
	        }
	        return hour;
	    } else {
	        // this is not supposed to happen
	        return hour;
	    }
	}

	// date from string and array of format strings
	function configFromStringAndArray(config) {
	    var tempConfig,
	        bestMoment,

	        scoreToBeat,
	        i,
	        currentScore;

	    if (config._f.length === 0) {
	        getParsingFlags(config).invalidFormat = true;
	        config._d = new Date(NaN);
	        return;
	    }

	    for (i = 0; i < config._f.length; i++) {
	        currentScore = 0;
	        tempConfig = copyConfig({}, config);
	        if (config._useUTC != null) {
	            tempConfig._useUTC = config._useUTC;
	        }
	        tempConfig._f = config._f[i];
	        configFromStringAndFormat(tempConfig);

	        if (!isValid(tempConfig)) {
	            continue;
	        }

	        // if there is any input that was not parsed add a penalty for that format
	        currentScore += getParsingFlags(tempConfig).charsLeftOver;

	        //or tokens
	        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

	        getParsingFlags(tempConfig).score = currentScore;

	        if (scoreToBeat == null || currentScore < scoreToBeat) {
	            scoreToBeat = currentScore;
	            bestMoment = tempConfig;
	        }
	    }

	    extend(config, bestMoment || tempConfig);
	}

	function configFromObject(config) {
	    if (config._d) {
	        return;
	    }

	    var i = normalizeObjectUnits(config._i);
	    config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
	        return obj && parseInt(obj, 10);
	    });

	    configFromArray(config);
	}

	function createFromConfig (config) {
	    var res = new Moment(checkOverflow(prepareConfig(config)));
	    if (res._nextDay) {
	        // Adding is smart enough around DST
	        res.add(1, 'd');
	        res._nextDay = undefined;
	    }

	    return res;
	}

	function prepareConfig (config) {
	    var input = config._i,
	        format = config._f;

	    config._locale = config._locale || getLocale(config._l);

	    if (input === null || (format === undefined && input === '')) {
	        return createInvalid({nullInput: true});
	    }

	    if (typeof input === 'string') {
	        config._i = input = config._locale.preparse(input);
	    }

	    if (isMoment(input)) {
	        return new Moment(checkOverflow(input));
	    } else if (isDate(input)) {
	        config._d = input;
	    } else if (isArray(format)) {
	        configFromStringAndArray(config);
	    } else if (format) {
	        configFromStringAndFormat(config);
	    }  else {
	        configFromInput(config);
	    }

	    if (!isValid(config)) {
	        config._d = null;
	    }

	    return config;
	}

	function configFromInput(config) {
	    var input = config._i;
	    if (input === undefined) {
	        config._d = new Date(hooks.now());
	    } else if (isDate(input)) {
	        config._d = new Date(input.valueOf());
	    } else if (typeof input === 'string') {
	        configFromString(config);
	    } else if (isArray(input)) {
	        config._a = map(input.slice(0), function (obj) {
	            return parseInt(obj, 10);
	        });
	        configFromArray(config);
	    } else if (typeof(input) === 'object') {
	        configFromObject(config);
	    } else if (isNumber(input)) {
	        // from milliseconds
	        config._d = new Date(input);
	    } else {
	        hooks.createFromInputFallback(config);
	    }
	}

	function createLocalOrUTC (input, format, locale, strict, isUTC) {
	    var c = {};

	    if (locale === true || locale === false) {
	        strict = locale;
	        locale = undefined;
	    }

	    if ((isObject(input) && isObjectEmpty(input)) ||
	            (isArray(input) && input.length === 0)) {
	        input = undefined;
	    }
	    // object construction must be done this way.
	    // https://github.com/moment/moment/issues/1423
	    c._isAMomentObject = true;
	    c._useUTC = c._isUTC = isUTC;
	    c._l = locale;
	    c._i = input;
	    c._f = format;
	    c._strict = strict;

	    return createFromConfig(c);
	}

	function createLocal (input, format, locale, strict) {
	    return createLocalOrUTC(input, format, locale, strict, false);
	}

	var prototypeMin = deprecate(
	    'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other < this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);

	var prototypeMax = deprecate(
	    'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
	    function () {
	        var other = createLocal.apply(null, arguments);
	        if (this.isValid() && other.isValid()) {
	            return other > this ? this : other;
	        } else {
	            return createInvalid();
	        }
	    }
	);

	// Pick a moment m from moments so that m[fn](other) is true for all
	// other. This relies on the function fn to be transitive.
	//
	// moments should either be an array of moment objects or an array, whose
	// first element is an array of moment objects.
	function pickBy(fn, moments) {
	    var res, i;
	    if (moments.length === 1 && isArray(moments[0])) {
	        moments = moments[0];
	    }
	    if (!moments.length) {
	        return createLocal();
	    }
	    res = moments[0];
	    for (i = 1; i < moments.length; ++i) {
	        if (!moments[i].isValid() || moments[i][fn](res)) {
	            res = moments[i];
	        }
	    }
	    return res;
	}

	// TODO: Use [].sort instead?
	function min () {
	    var args = [].slice.call(arguments, 0);

	    return pickBy('isBefore', args);
	}

	function max () {
	    var args = [].slice.call(arguments, 0);

	    return pickBy('isAfter', args);
	}

	var now = function () {
	    return Date.now ? Date.now() : +(new Date());
	};

	function Duration (duration) {
	    var normalizedInput = normalizeObjectUnits(duration),
	        years = normalizedInput.year || 0,
	        quarters = normalizedInput.quarter || 0,
	        months = normalizedInput.month || 0,
	        weeks = normalizedInput.week || 0,
	        days = normalizedInput.day || 0,
	        hours = normalizedInput.hour || 0,
	        minutes = normalizedInput.minute || 0,
	        seconds = normalizedInput.second || 0,
	        milliseconds = normalizedInput.millisecond || 0;

	    // representation for dateAddRemove
	    this._milliseconds = +milliseconds +
	        seconds * 1e3 + // 1000
	        minutes * 6e4 + // 1000 * 60
	        hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
	    // Because of dateAddRemove treats 24 hours as different from a
	    // day when working around DST, we need to store them separately
	    this._days = +days +
	        weeks * 7;
	    // It is impossible translate months into days without knowing
	    // which months you are are talking about, so we have to store
	    // it separately.
	    this._months = +months +
	        quarters * 3 +
	        years * 12;

	    this._data = {};

	    this._locale = getLocale();

	    this._bubble();
	}

	function isDuration (obj) {
	    return obj instanceof Duration;
	}

	function absRound (number) {
	    if (number < 0) {
	        return Math.round(-1 * number) * -1;
	    } else {
	        return Math.round(number);
	    }
	}

	// FORMATTING

	function offset (token, separator) {
	    addFormatToken(token, 0, 0, function () {
	        var offset = this.utcOffset();
	        var sign = '+';
	        if (offset < 0) {
	            offset = -offset;
	            sign = '-';
	        }
	        return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
	    });
	}

	offset('Z', ':');
	offset('ZZ', '');

	// PARSING

	addRegexToken('Z',  matchShortOffset);
	addRegexToken('ZZ', matchShortOffset);
	addParseToken(['Z', 'ZZ'], function (input, array, config) {
	    config._useUTC = true;
	    config._tzm = offsetFromString(matchShortOffset, input);
	});

	// HELPERS

	// timezone chunker
	// '+10:00' > ['10',  '00']
	// '-1530'  > ['-15', '30']
	var chunkOffset = /([\+\-]|\d\d)/gi;

	function offsetFromString(matcher, string) {
	    var matches = (string || '').match(matcher);

	    if (matches === null) {
	        return null;
	    }

	    var chunk   = matches[matches.length - 1] || [];
	    var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
	    var minutes = +(parts[1] * 60) + toInt(parts[2]);

	    return minutes === 0 ?
	      0 :
	      parts[0] === '+' ? minutes : -minutes;
	}

	// Return a moment from input, that is local/utc/zone equivalent to model.
	function cloneWithOffset(input, model) {
	    var res, diff;
	    if (model._isUTC) {
	        res = model.clone();
	        diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
	        // Use low-level api, because this fn is low-level api.
	        res._d.setTime(res._d.valueOf() + diff);
	        hooks.updateOffset(res, false);
	        return res;
	    } else {
	        return createLocal(input).local();
	    }
	}

	function getDateOffset (m) {
	    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
	    // https://github.com/moment/moment/pull/1871
	    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
	}

	// HOOKS

	// This function will be called whenever a moment is mutated.
	// It is intended to keep the offset in sync with the timezone.
	hooks.updateOffset = function () {};

	// MOMENTS

	// keepLocalTime = true means only change the timezone, without
	// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
	// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
	// +0200, so we adjust the time as needed, to be valid.
	//
	// Keeping the time actually adds/subtracts (one hour)
	// from the actual represented time. That is why we call updateOffset
	// a second time. In case it wants us to change the offset again
	// _changeInProgress == true case, then we have to adjust, because
	// there is no such time in the given timezone.
	function getSetOffset (input, keepLocalTime) {
	    var offset = this._offset || 0,
	        localAdjust;
	    if (!this.isValid()) {
	        return input != null ? this : NaN;
	    }
	    if (input != null) {
	        if (typeof input === 'string') {
	            input = offsetFromString(matchShortOffset, input);
	            if (input === null) {
	                return this;
	            }
	        } else if (Math.abs(input) < 16) {
	            input = input * 60;
	        }
	        if (!this._isUTC && keepLocalTime) {
	            localAdjust = getDateOffset(this);
	        }
	        this._offset = input;
	        this._isUTC = true;
	        if (localAdjust != null) {
	            this.add(localAdjust, 'm');
	        }
	        if (offset !== input) {
	            if (!keepLocalTime || this._changeInProgress) {
	                addSubtract(this, createDuration(input - offset, 'm'), 1, false);
	            } else if (!this._changeInProgress) {
	                this._changeInProgress = true;
	                hooks.updateOffset(this, true);
	                this._changeInProgress = null;
	            }
	        }
	        return this;
	    } else {
	        return this._isUTC ? offset : getDateOffset(this);
	    }
	}

	function getSetZone (input, keepLocalTime) {
	    if (input != null) {
	        if (typeof input !== 'string') {
	            input = -input;
	        }

	        this.utcOffset(input, keepLocalTime);

	        return this;
	    } else {
	        return -this.utcOffset();
	    }
	}

	function setOffsetToUTC (keepLocalTime) {
	    return this.utcOffset(0, keepLocalTime);
	}

	function setOffsetToLocal (keepLocalTime) {
	    if (this._isUTC) {
	        this.utcOffset(0, keepLocalTime);
	        this._isUTC = false;

	        if (keepLocalTime) {
	            this.subtract(getDateOffset(this), 'm');
	        }
	    }
	    return this;
	}

	function setOffsetToParsedOffset () {
	    if (this._tzm != null) {
	        this.utcOffset(this._tzm);
	    } else if (typeof this._i === 'string') {
	        var tZone = offsetFromString(matchOffset, this._i);
	        if (tZone != null) {
	            this.utcOffset(tZone);
	        }
	        else {
	            this.utcOffset(0, true);
	        }
	    }
	    return this;
	}

	function hasAlignedHourOffset (input) {
	    if (!this.isValid()) {
	        return false;
	    }
	    input = input ? createLocal(input).utcOffset() : 0;

	    return (this.utcOffset() - input) % 60 === 0;
	}

	function isDaylightSavingTime () {
	    return (
	        this.utcOffset() > this.clone().month(0).utcOffset() ||
	        this.utcOffset() > this.clone().month(5).utcOffset()
	    );
	}

	function isDaylightSavingTimeShifted () {
	    if (!isUndefined(this._isDSTShifted)) {
	        return this._isDSTShifted;
	    }

	    var c = {};

	    copyConfig(c, this);
	    c = prepareConfig(c);

	    if (c._a) {
	        var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
	        this._isDSTShifted = this.isValid() &&
	            compareArrays(c._a, other.toArray()) > 0;
	    } else {
	        this._isDSTShifted = false;
	    }

	    return this._isDSTShifted;
	}

	function isLocal () {
	    return this.isValid() ? !this._isUTC : false;
	}

	function isUtcOffset () {
	    return this.isValid() ? this._isUTC : false;
	}

	function isUtc () {
	    return this.isValid() ? this._isUTC && this._offset === 0 : false;
	}

	// ASP.NET json date format regex
	var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

	// from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
	// somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
	// and further modified to allow for strings containing both week and day
	var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

	function createDuration (input, key) {
	    var duration = input,
	        // matching against regexp is expensive, do it on demand
	        match = null,
	        sign,
	        ret,
	        diffRes;

	    if (isDuration(input)) {
	        duration = {
	            ms : input._milliseconds,
	            d  : input._days,
	            M  : input._months
	        };
	    } else if (isNumber(input)) {
	        duration = {};
	        if (key) {
	            duration[key] = input;
	        } else {
	            duration.milliseconds = input;
	        }
	    } else if (!!(match = aspNetRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y  : 0,
	            d  : toInt(match[DATE])                         * sign,
	            h  : toInt(match[HOUR])                         * sign,
	            m  : toInt(match[MINUTE])                       * sign,
	            s  : toInt(match[SECOND])                       * sign,
	            ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
	        };
	    } else if (!!(match = isoRegex.exec(input))) {
	        sign = (match[1] === '-') ? -1 : 1;
	        duration = {
	            y : parseIso(match[2], sign),
	            M : parseIso(match[3], sign),
	            w : parseIso(match[4], sign),
	            d : parseIso(match[5], sign),
	            h : parseIso(match[6], sign),
	            m : parseIso(match[7], sign),
	            s : parseIso(match[8], sign)
	        };
	    } else if (duration == null) {// checks for null or undefined
	        duration = {};
	    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
	        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

	        duration = {};
	        duration.ms = diffRes.milliseconds;
	        duration.M = diffRes.months;
	    }

	    ret = new Duration(duration);

	    if (isDuration(input) && hasOwnProp(input, '_locale')) {
	        ret._locale = input._locale;
	    }

	    return ret;
	}

	createDuration.fn = Duration.prototype;

	function parseIso (inp, sign) {
	    // We'd normally use ~~inp for this, but unfortunately it also
	    // converts floats to ints.
	    // inp may be undefined, so careful calling replace on it.
	    var res = inp && parseFloat(inp.replace(',', '.'));
	    // apply sign while we're at it
	    return (isNaN(res) ? 0 : res) * sign;
	}

	function positiveMomentsDifference(base, other) {
	    var res = {milliseconds: 0, months: 0};

	    res.months = other.month() - base.month() +
	        (other.year() - base.year()) * 12;
	    if (base.clone().add(res.months, 'M').isAfter(other)) {
	        --res.months;
	    }

	    res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

	    return res;
	}

	function momentsDifference(base, other) {
	    var res;
	    if (!(base.isValid() && other.isValid())) {
	        return {milliseconds: 0, months: 0};
	    }

	    other = cloneWithOffset(other, base);
	    if (base.isBefore(other)) {
	        res = positiveMomentsDifference(base, other);
	    } else {
	        res = positiveMomentsDifference(other, base);
	        res.milliseconds = -res.milliseconds;
	        res.months = -res.months;
	    }

	    return res;
	}

	// TODO: remove 'name' arg after deprecation is removed
	function createAdder(direction, name) {
	    return function (val, period) {
	        var dur, tmp;
	        //invert the arguments, but complain about it
	        if (period !== null && !isNaN(+period)) {
	            deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
	            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
	            tmp = val; val = period; period = tmp;
	        }

	        val = typeof val === 'string' ? +val : val;
	        dur = createDuration(val, period);
	        addSubtract(this, dur, direction);
	        return this;
	    };
	}

	function addSubtract (mom, duration, isAdding, updateOffset) {
	    var milliseconds = duration._milliseconds,
	        days = absRound(duration._days),
	        months = absRound(duration._months);

	    if (!mom.isValid()) {
	        // No op
	        return;
	    }

	    updateOffset = updateOffset == null ? true : updateOffset;

	    if (milliseconds) {
	        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
	    }
	    if (days) {
	        set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
	    }
	    if (months) {
	        setMonth(mom, get(mom, 'Month') + months * isAdding);
	    }
	    if (updateOffset) {
	        hooks.updateOffset(mom, days || months);
	    }
	}

	var add      = createAdder(1, 'add');
	var subtract = createAdder(-1, 'subtract');

	function getCalendarFormat(myMoment, now) {
	    var diff = myMoment.diff(now, 'days', true);
	    return diff < -6 ? 'sameElse' :
	            diff < -1 ? 'lastWeek' :
	            diff < 0 ? 'lastDay' :
	            diff < 1 ? 'sameDay' :
	            diff < 2 ? 'nextDay' :
	            diff < 7 ? 'nextWeek' : 'sameElse';
	}

	function calendar$1 (time, formats) {
	    // We want to compare the start of today, vs this.
	    // Getting start-of-today depends on whether we're local/utc/offset or not.
	    var now = time || createLocal(),
	        sod = cloneWithOffset(now, this).startOf('day'),
	        format = hooks.calendarFormat(this, sod) || 'sameElse';

	    var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

	    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
	}

	function clone () {
	    return new Moment(this);
	}

	function isAfter (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() > localInput.valueOf();
	    } else {
	        return localInput.valueOf() < this.clone().startOf(units).valueOf();
	    }
	}

	function isBefore (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input);
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() < localInput.valueOf();
	    } else {
	        return this.clone().endOf(units).valueOf() < localInput.valueOf();
	    }
	}

	function isBetween (from, to, units, inclusivity) {
	    inclusivity = inclusivity || '()';
	    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
	        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
	}

	function isSame (input, units) {
	    var localInput = isMoment(input) ? input : createLocal(input),
	        inputMs;
	    if (!(this.isValid() && localInput.isValid())) {
	        return false;
	    }
	    units = normalizeUnits(units || 'millisecond');
	    if (units === 'millisecond') {
	        return this.valueOf() === localInput.valueOf();
	    } else {
	        inputMs = localInput.valueOf();
	        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
	    }
	}

	function isSameOrAfter (input, units) {
	    return this.isSame(input, units) || this.isAfter(input,units);
	}

	function isSameOrBefore (input, units) {
	    return this.isSame(input, units) || this.isBefore(input,units);
	}

	function diff (input, units, asFloat) {
	    var that,
	        zoneDelta,
	        delta, output;

	    if (!this.isValid()) {
	        return NaN;
	    }

	    that = cloneWithOffset(input, this);

	    if (!that.isValid()) {
	        return NaN;
	    }

	    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

	    units = normalizeUnits(units);

	    if (units === 'year' || units === 'month' || units === 'quarter') {
	        output = monthDiff(this, that);
	        if (units === 'quarter') {
	            output = output / 3;
	        } else if (units === 'year') {
	            output = output / 12;
	        }
	    } else {
	        delta = this - that;
	        output = units === 'second' ? delta / 1e3 : // 1000
	            units === 'minute' ? delta / 6e4 : // 1000 * 60
	            units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
	            units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
	            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
	            delta;
	    }
	    return asFloat ? output : absFloor(output);
	}

	function monthDiff (a, b) {
	    // difference in months
	    var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
	        // b is in (anchor - 1 month, anchor + 1 month)
	        anchor = a.clone().add(wholeMonthDiff, 'months'),
	        anchor2, adjust;

	    if (b - anchor < 0) {
	        anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
	        // linear across the month
	        adjust = (b - anchor) / (anchor - anchor2);
	    } else {
	        anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
	        // linear across the month
	        adjust = (b - anchor) / (anchor2 - anchor);
	    }

	    //check for negative zero, return zero if negative zero
	    return -(wholeMonthDiff + adjust) || 0;
	}

	hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
	hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

	function toString () {
	    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
	}

	function toISOString () {
	    var m = this.clone().utc();
	    if (0 < m.year() && m.year() <= 9999) {
	        if (isFunction(Date.prototype.toISOString)) {
	            // native implementation is ~50x faster, use it when we can
	            return this.toDate().toISOString();
	        } else {
	            return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	        }
	    } else {
	        return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
	    }
	}

	/**
	 * Return a human readable representation of a moment that can
	 * also be evaluated to get a new moment which is the same
	 *
	 * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
	 */
	function inspect () {
	    if (!this.isValid()) {
	        return 'moment.invalid(/* ' + this._i + ' */)';
	    }
	    var func = 'moment';
	    var zone = '';
	    if (!this.isLocal()) {
	        func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
	        zone = 'Z';
	    }
	    var prefix = '[' + func + '("]';
	    var year = (0 < this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
	    var datetime = '-MM-DD[T]HH:mm:ss.SSS';
	    var suffix = zone + '[")]';

	    return this.format(prefix + year + datetime + suffix);
	}

	function format (inputString) {
	    if (!inputString) {
	        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
	    }
	    var output = formatMoment(this, inputString);
	    return this.localeData().postformat(output);
	}

	function from (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}

	function fromNow (withoutSuffix) {
	    return this.from(createLocal(), withoutSuffix);
	}

	function to (time, withoutSuffix) {
	    if (this.isValid() &&
	            ((isMoment(time) && time.isValid()) ||
	             createLocal(time).isValid())) {
	        return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
	    } else {
	        return this.localeData().invalidDate();
	    }
	}

	function toNow (withoutSuffix) {
	    return this.to(createLocal(), withoutSuffix);
	}

	// If passed a locale key, it will set the locale for this
	// instance.  Otherwise, it will return the locale configuration
	// variables for this instance.
	function locale (key) {
	    var newLocaleData;

	    if (key === undefined) {
	        return this._locale._abbr;
	    } else {
	        newLocaleData = getLocale(key);
	        if (newLocaleData != null) {
	            this._locale = newLocaleData;
	        }
	        return this;
	    }
	}

	var lang = deprecate(
	    'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
	    function (key) {
	        if (key === undefined) {
	            return this.localeData();
	        } else {
	            return this.locale(key);
	        }
	    }
	);

	function localeData () {
	    return this._locale;
	}

	function startOf (units) {
	    units = normalizeUnits(units);
	    // the following switch intentionally omits break keywords
	    // to utilize falling through the cases.
	    switch (units) {
	        case 'year':
	            this.month(0);
	            /* falls through */
	        case 'quarter':
	        case 'month':
	            this.date(1);
	            /* falls through */
	        case 'week':
	        case 'isoWeek':
	        case 'day':
	        case 'date':
	            this.hours(0);
	            /* falls through */
	        case 'hour':
	            this.minutes(0);
	            /* falls through */
	        case 'minute':
	            this.seconds(0);
	            /* falls through */
	        case 'second':
	            this.milliseconds(0);
	    }

	    // weeks are a special case
	    if (units === 'week') {
	        this.weekday(0);
	    }
	    if (units === 'isoWeek') {
	        this.isoWeekday(1);
	    }

	    // quarters are also special
	    if (units === 'quarter') {
	        this.month(Math.floor(this.month() / 3) * 3);
	    }

	    return this;
	}

	function endOf (units) {
	    units = normalizeUnits(units);
	    if (units === undefined || units === 'millisecond') {
	        return this;
	    }

	    // 'date' is an alias for 'day', so it should be considered as such.
	    if (units === 'date') {
	        units = 'day';
	    }

	    return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
	}

	function valueOf () {
	    return this._d.valueOf() - ((this._offset || 0) * 60000);
	}

	function unix () {
	    return Math.floor(this.valueOf() / 1000);
	}

	function toDate () {
	    return new Date(this.valueOf());
	}

	function toArray () {
	    var m = this;
	    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
	}

	function toObject () {
	    var m = this;
	    return {
	        years: m.year(),
	        months: m.month(),
	        date: m.date(),
	        hours: m.hours(),
	        minutes: m.minutes(),
	        seconds: m.seconds(),
	        milliseconds: m.milliseconds()
	    };
	}

	function toJSON () {
	    // new Date(NaN).toJSON() === null
	    return this.isValid() ? this.toISOString() : null;
	}

	function isValid$1 () {
	    return isValid(this);
	}

	function parsingFlags () {
	    return extend({}, getParsingFlags(this));
	}

	function invalidAt () {
	    return getParsingFlags(this).overflow;
	}

	function creationData() {
	    return {
	        input: this._i,
	        format: this._f,
	        locale: this._locale,
	        isUTC: this._isUTC,
	        strict: this._strict
	    };
	}

	// FORMATTING

	addFormatToken(0, ['gg', 2], 0, function () {
	    return this.weekYear() % 100;
	});

	addFormatToken(0, ['GG', 2], 0, function () {
	    return this.isoWeekYear() % 100;
	});

	function addWeekYearFormatToken (token, getter) {
	    addFormatToken(0, [token, token.length], 0, getter);
	}

	addWeekYearFormatToken('gggg',     'weekYear');
	addWeekYearFormatToken('ggggg',    'weekYear');
	addWeekYearFormatToken('GGGG',  'isoWeekYear');
	addWeekYearFormatToken('GGGGG', 'isoWeekYear');

	// ALIASES

	addUnitAlias('weekYear', 'gg');
	addUnitAlias('isoWeekYear', 'GG');

	// PRIORITY

	addUnitPriority('weekYear', 1);
	addUnitPriority('isoWeekYear', 1);


	// PARSING

	addRegexToken('G',      matchSigned);
	addRegexToken('g',      matchSigned);
	addRegexToken('GG',     match1to2, match2);
	addRegexToken('gg',     match1to2, match2);
	addRegexToken('GGGG',   match1to4, match4);
	addRegexToken('gggg',   match1to4, match4);
	addRegexToken('GGGGG',  match1to6, match6);
	addRegexToken('ggggg',  match1to6, match6);

	addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
	    week[token.substr(0, 2)] = toInt(input);
	});

	addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
	    week[token] = hooks.parseTwoDigitYear(input);
	});

	// MOMENTS

	function getSetWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input,
	            this.week(),
	            this.weekday(),
	            this.localeData()._week.dow,
	            this.localeData()._week.doy);
	}

	function getSetISOWeekYear (input) {
	    return getSetWeekYearHelper.call(this,
	            input, this.isoWeek(), this.isoWeekday(), 1, 4);
	}

	function getISOWeeksInYear () {
	    return weeksInYear(this.year(), 1, 4);
	}

	function getWeeksInYear () {
	    var weekInfo = this.localeData()._week;
	    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
	}

	function getSetWeekYearHelper(input, week, weekday, dow, doy) {
	    var weeksTarget;
	    if (input == null) {
	        return weekOfYear(this, dow, doy).year;
	    } else {
	        weeksTarget = weeksInYear(input, dow, doy);
	        if (week > weeksTarget) {
	            week = weeksTarget;
	        }
	        return setWeekAll.call(this, input, week, weekday, dow, doy);
	    }
	}

	function setWeekAll(weekYear, week, weekday, dow, doy) {
	    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
	        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

	    this.year(date.getUTCFullYear());
	    this.month(date.getUTCMonth());
	    this.date(date.getUTCDate());
	    return this;
	}

	// FORMATTING

	addFormatToken('Q', 0, 'Qo', 'quarter');

	// ALIASES

	addUnitAlias('quarter', 'Q');

	// PRIORITY

	addUnitPriority('quarter', 7);

	// PARSING

	addRegexToken('Q', match1);
	addParseToken('Q', function (input, array) {
	    array[MONTH] = (toInt(input) - 1) * 3;
	});

	// MOMENTS

	function getSetQuarter (input) {
	    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
	}

	// FORMATTING

	addFormatToken('D', ['DD', 2], 'Do', 'date');

	// ALIASES

	addUnitAlias('date', 'D');

	// PRIOROITY
	addUnitPriority('date', 9);

	// PARSING

	addRegexToken('D',  match1to2);
	addRegexToken('DD', match1to2, match2);
	addRegexToken('Do', function (isStrict, locale) {
	    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
	});

	addParseToken(['D', 'DD'], DATE);
	addParseToken('Do', function (input, array) {
	    array[DATE] = toInt(input.match(match1to2)[0], 10);
	});

	// MOMENTS

	var getSetDayOfMonth = makeGetSet('Date', true);

	// FORMATTING

	addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

	// ALIASES

	addUnitAlias('dayOfYear', 'DDD');

	// PRIORITY
	addUnitPriority('dayOfYear', 4);

	// PARSING

	addRegexToken('DDD',  match1to3);
	addRegexToken('DDDD', match3);
	addParseToken(['DDD', 'DDDD'], function (input, array, config) {
	    config._dayOfYear = toInt(input);
	});

	// HELPERS

	// MOMENTS

	function getSetDayOfYear (input) {
	    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
	    return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
	}

	// FORMATTING

	addFormatToken('m', ['mm', 2], 0, 'minute');

	// ALIASES

	addUnitAlias('minute', 'm');

	// PRIORITY

	addUnitPriority('minute', 14);

	// PARSING

	addRegexToken('m',  match1to2);
	addRegexToken('mm', match1to2, match2);
	addParseToken(['m', 'mm'], MINUTE);

	// MOMENTS

	var getSetMinute = makeGetSet('Minutes', false);

	// FORMATTING

	addFormatToken('s', ['ss', 2], 0, 'second');

	// ALIASES

	addUnitAlias('second', 's');

	// PRIORITY

	addUnitPriority('second', 15);

	// PARSING

	addRegexToken('s',  match1to2);
	addRegexToken('ss', match1to2, match2);
	addParseToken(['s', 'ss'], SECOND);

	// MOMENTS

	var getSetSecond = makeGetSet('Seconds', false);

	// FORMATTING

	addFormatToken('S', 0, 0, function () {
	    return ~~(this.millisecond() / 100);
	});

	addFormatToken(0, ['SS', 2], 0, function () {
	    return ~~(this.millisecond() / 10);
	});

	addFormatToken(0, ['SSS', 3], 0, 'millisecond');
	addFormatToken(0, ['SSSS', 4], 0, function () {
	    return this.millisecond() * 10;
	});
	addFormatToken(0, ['SSSSS', 5], 0, function () {
	    return this.millisecond() * 100;
	});
	addFormatToken(0, ['SSSSSS', 6], 0, function () {
	    return this.millisecond() * 1000;
	});
	addFormatToken(0, ['SSSSSSS', 7], 0, function () {
	    return this.millisecond() * 10000;
	});
	addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
	    return this.millisecond() * 100000;
	});
	addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
	    return this.millisecond() * 1000000;
	});


	// ALIASES

	addUnitAlias('millisecond', 'ms');

	// PRIORITY

	addUnitPriority('millisecond', 16);

	// PARSING

	addRegexToken('S',    match1to3, match1);
	addRegexToken('SS',   match1to3, match2);
	addRegexToken('SSS',  match1to3, match3);

	var token;
	for (token = 'SSSS'; token.length <= 9; token += 'S') {
	    addRegexToken(token, matchUnsigned);
	}

	function parseMs(input, array) {
	    array[MILLISECOND] = toInt(('0.' + input) * 1000);
	}

	for (token = 'S'; token.length <= 9; token += 'S') {
	    addParseToken(token, parseMs);
	}
	// MOMENTS

	var getSetMillisecond = makeGetSet('Milliseconds', false);

	// FORMATTING

	addFormatToken('z',  0, 0, 'zoneAbbr');
	addFormatToken('zz', 0, 0, 'zoneName');

	// MOMENTS

	function getZoneAbbr () {
	    return this._isUTC ? 'UTC' : '';
	}

	function getZoneName () {
	    return this._isUTC ? 'Coordinated Universal Time' : '';
	}

	var proto = Moment.prototype;

	proto.add               = add;
	proto.calendar          = calendar$1;
	proto.clone             = clone;
	proto.diff              = diff;
	proto.endOf             = endOf;
	proto.format            = format;
	proto.from              = from;
	proto.fromNow           = fromNow;
	proto.to                = to;
	proto.toNow             = toNow;
	proto.get               = stringGet;
	proto.invalidAt         = invalidAt;
	proto.isAfter           = isAfter;
	proto.isBefore          = isBefore;
	proto.isBetween         = isBetween;
	proto.isSame            = isSame;
	proto.isSameOrAfter     = isSameOrAfter;
	proto.isSameOrBefore    = isSameOrBefore;
	proto.isValid           = isValid$1;
	proto.lang              = lang;
	proto.locale            = locale;
	proto.localeData        = localeData;
	proto.max               = prototypeMax;
	proto.min               = prototypeMin;
	proto.parsingFlags      = parsingFlags;
	proto.set               = stringSet;
	proto.startOf           = startOf;
	proto.subtract          = subtract;
	proto.toArray           = toArray;
	proto.toObject          = toObject;
	proto.toDate            = toDate;
	proto.toISOString       = toISOString;
	proto.inspect           = inspect;
	proto.toJSON            = toJSON;
	proto.toString          = toString;
	proto.unix              = unix;
	proto.valueOf           = valueOf;
	proto.creationData      = creationData;

	// Year
	proto.year       = getSetYear;
	proto.isLeapYear = getIsLeapYear;

	// Week Year
	proto.weekYear    = getSetWeekYear;
	proto.isoWeekYear = getSetISOWeekYear;

	// Quarter
	proto.quarter = proto.quarters = getSetQuarter;

	// Month
	proto.month       = getSetMonth;
	proto.daysInMonth = getDaysInMonth;

	// Week
	proto.week           = proto.weeks        = getSetWeek;
	proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
	proto.weeksInYear    = getWeeksInYear;
	proto.isoWeeksInYear = getISOWeeksInYear;

	// Day
	proto.date       = getSetDayOfMonth;
	proto.day        = proto.days             = getSetDayOfWeek;
	proto.weekday    = getSetLocaleDayOfWeek;
	proto.isoWeekday = getSetISODayOfWeek;
	proto.dayOfYear  = getSetDayOfYear;

	// Hour
	proto.hour = proto.hours = getSetHour;

	// Minute
	proto.minute = proto.minutes = getSetMinute;

	// Second
	proto.second = proto.seconds = getSetSecond;

	// Millisecond
	proto.millisecond = proto.milliseconds = getSetMillisecond;

	// Offset
	proto.utcOffset            = getSetOffset;
	proto.utc                  = setOffsetToUTC;
	proto.local                = setOffsetToLocal;
	proto.parseZone            = setOffsetToParsedOffset;
	proto.hasAlignedHourOffset = hasAlignedHourOffset;
	proto.isDST                = isDaylightSavingTime;
	proto.isLocal              = isLocal;
	proto.isUtcOffset          = isUtcOffset;
	proto.isUtc                = isUtc;
	proto.isUTC                = isUtc;

	// Timezone
	proto.zoneAbbr = getZoneAbbr;
	proto.zoneName = getZoneName;

	// Deprecations
	proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
	proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
	proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
	proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
	proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

	function createUnix (input) {
	    return createLocal(input * 1000);
	}

	function createInZone () {
	    return createLocal.apply(null, arguments).parseZone();
	}

	function preParsePostFormat (string) {
	    return string;
	}

	var proto$1 = Locale.prototype;

	proto$1.calendar        = calendar;
	proto$1.longDateFormat  = longDateFormat;
	proto$1.invalidDate     = invalidDate;
	proto$1.ordinal         = ordinal;
	proto$1.preparse        = preParsePostFormat;
	proto$1.postformat      = preParsePostFormat;
	proto$1.relativeTime    = relativeTime;
	proto$1.pastFuture      = pastFuture;
	proto$1.set             = set;

	// Month
	proto$1.months            =        localeMonths;
	proto$1.monthsShort       =        localeMonthsShort;
	proto$1.monthsParse       =        localeMonthsParse;
	proto$1.monthsRegex       = monthsRegex;
	proto$1.monthsShortRegex  = monthsShortRegex;

	// Week
	proto$1.week = localeWeek;
	proto$1.firstDayOfYear = localeFirstDayOfYear;
	proto$1.firstDayOfWeek = localeFirstDayOfWeek;

	// Day of Week
	proto$1.weekdays       =        localeWeekdays;
	proto$1.weekdaysMin    =        localeWeekdaysMin;
	proto$1.weekdaysShort  =        localeWeekdaysShort;
	proto$1.weekdaysParse  =        localeWeekdaysParse;

	proto$1.weekdaysRegex       =        weekdaysRegex;
	proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
	proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

	// Hours
	proto$1.isPM = localeIsPM;
	proto$1.meridiem = localeMeridiem;

	function get$1 (format, index, field, setter) {
	    var locale = getLocale();
	    var utc = createUTC().set(setter, index);
	    return locale[field](utc, format);
	}

	function listMonthsImpl (format, index, field) {
	    if (isNumber(format)) {
	        index = format;
	        format = undefined;
	    }

	    format = format || '';

	    if (index != null) {
	        return get$1(format, index, field, 'month');
	    }

	    var i;
	    var out = [];
	    for (i = 0; i < 12; i++) {
	        out[i] = get$1(format, i, field, 'month');
	    }
	    return out;
	}

	// ()
	// (5)
	// (fmt, 5)
	// (fmt)
	// (true)
	// (true, 5)
	// (true, fmt, 5)
	// (true, fmt)
	function listWeekdaysImpl (localeSorted, format, index, field) {
	    if (typeof localeSorted === 'boolean') {
	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';
	    } else {
	        format = localeSorted;
	        index = format;
	        localeSorted = false;

	        if (isNumber(format)) {
	            index = format;
	            format = undefined;
	        }

	        format = format || '';
	    }

	    var locale = getLocale(),
	        shift = localeSorted ? locale._week.dow : 0;

	    if (index != null) {
	        return get$1(format, (index + shift) % 7, field, 'day');
	    }

	    var i;
	    var out = [];
	    for (i = 0; i < 7; i++) {
	        out[i] = get$1(format, (i + shift) % 7, field, 'day');
	    }
	    return out;
	}

	function listMonths (format, index) {
	    return listMonthsImpl(format, index, 'months');
	}

	function listMonthsShort (format, index) {
	    return listMonthsImpl(format, index, 'monthsShort');
	}

	function listWeekdays (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
	}

	function listWeekdaysShort (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
	}

	function listWeekdaysMin (localeSorted, format, index) {
	    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
	}

	getSetGlobalLocale('en', {
	    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (toInt(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    }
	});

	// Side effect imports
	hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
	hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

	var mathAbs = Math.abs;

	function abs () {
	    var data           = this._data;

	    this._milliseconds = mathAbs(this._milliseconds);
	    this._days         = mathAbs(this._days);
	    this._months       = mathAbs(this._months);

	    data.milliseconds  = mathAbs(data.milliseconds);
	    data.seconds       = mathAbs(data.seconds);
	    data.minutes       = mathAbs(data.minutes);
	    data.hours         = mathAbs(data.hours);
	    data.months        = mathAbs(data.months);
	    data.years         = mathAbs(data.years);

	    return this;
	}

	function addSubtract$1 (duration, input, value, direction) {
	    var other = createDuration(input, value);

	    duration._milliseconds += direction * other._milliseconds;
	    duration._days         += direction * other._days;
	    duration._months       += direction * other._months;

	    return duration._bubble();
	}

	// supports only 2.0-style add(1, 's') or add(duration)
	function add$1 (input, value) {
	    return addSubtract$1(this, input, value, 1);
	}

	// supports only 2.0-style subtract(1, 's') or subtract(duration)
	function subtract$1 (input, value) {
	    return addSubtract$1(this, input, value, -1);
	}

	function absCeil (number) {
	    if (number < 0) {
	        return Math.floor(number);
	    } else {
	        return Math.ceil(number);
	    }
	}

	function bubble () {
	    var milliseconds = this._milliseconds;
	    var days         = this._days;
	    var months       = this._months;
	    var data         = this._data;
	    var seconds, minutes, hours, years, monthsFromDays;

	    // if we have a mix of positive and negative values, bubble down first
	    // check: https://github.com/moment/moment/issues/2166
	    if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
	            (milliseconds <= 0 && days <= 0 && months <= 0))) {
	        milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
	        days = 0;
	        months = 0;
	    }

	    // The following code bubbles up values, see the tests for
	    // examples of what that means.
	    data.milliseconds = milliseconds % 1000;

	    seconds           = absFloor(milliseconds / 1000);
	    data.seconds      = seconds % 60;

	    minutes           = absFloor(seconds / 60);
	    data.minutes      = minutes % 60;

	    hours             = absFloor(minutes / 60);
	    data.hours        = hours % 24;

	    days += absFloor(hours / 24);

	    // convert days to months
	    monthsFromDays = absFloor(daysToMonths(days));
	    months += monthsFromDays;
	    days -= absCeil(monthsToDays(monthsFromDays));

	    // 12 months -> 1 year
	    years = absFloor(months / 12);
	    months %= 12;

	    data.days   = days;
	    data.months = months;
	    data.years  = years;

	    return this;
	}

	function daysToMonths (days) {
	    // 400 years have 146097 days (taking into account leap year rules)
	    // 400 years have 12 months === 4800
	    return days * 4800 / 146097;
	}

	function monthsToDays (months) {
	    // the reverse of daysToMonths
	    return months * 146097 / 4800;
	}

	function as (units) {
	    var days;
	    var months;
	    var milliseconds = this._milliseconds;

	    units = normalizeUnits(units);

	    if (units === 'month' || units === 'year') {
	        days   = this._days   + milliseconds / 864e5;
	        months = this._months + daysToMonths(days);
	        return units === 'month' ? months : months / 12;
	    } else {
	        // handle milliseconds separately because of floating point math errors (issue #1867)
	        days = this._days + Math.round(monthsToDays(this._months));
	        switch (units) {
	            case 'week'   : return days / 7     + milliseconds / 6048e5;
	            case 'day'    : return days         + milliseconds / 864e5;
	            case 'hour'   : return days * 24    + milliseconds / 36e5;
	            case 'minute' : return days * 1440  + milliseconds / 6e4;
	            case 'second' : return days * 86400 + milliseconds / 1000;
	            // Math.floor prevents floating point math errors here
	            case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
	            default: throw new Error('Unknown unit ' + units);
	        }
	    }
	}

	// TODO: Use this.as('ms')?
	function valueOf$1 () {
	    return (
	        this._milliseconds +
	        this._days * 864e5 +
	        (this._months % 12) * 2592e6 +
	        toInt(this._months / 12) * 31536e6
	    );
	}

	function makeAs (alias) {
	    return function () {
	        return this.as(alias);
	    };
	}

	var asMilliseconds = makeAs('ms');
	var asSeconds      = makeAs('s');
	var asMinutes      = makeAs('m');
	var asHours        = makeAs('h');
	var asDays         = makeAs('d');
	var asWeeks        = makeAs('w');
	var asMonths       = makeAs('M');
	var asYears        = makeAs('y');

	function get$2 (units) {
	    units = normalizeUnits(units);
	    return this[units + 's']();
	}

	function makeGetter(name) {
	    return function () {
	        return this._data[name];
	    };
	}

	var milliseconds = makeGetter('milliseconds');
	var seconds      = makeGetter('seconds');
	var minutes      = makeGetter('minutes');
	var hours        = makeGetter('hours');
	var days         = makeGetter('days');
	var months       = makeGetter('months');
	var years        = makeGetter('years');

	function weeks () {
	    return absFloor(this.days() / 7);
	}

	var round = Math.round;
	var thresholds = {
	    s: 45,  // seconds to minute
	    m: 45,  // minutes to hour
	    h: 22,  // hours to day
	    d: 26,  // days to month
	    M: 11   // months to year
	};

	// helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
	function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
	    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
	}

	function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
	    var duration = createDuration(posNegDuration).abs();
	    var seconds  = round(duration.as('s'));
	    var minutes  = round(duration.as('m'));
	    var hours    = round(duration.as('h'));
	    var days     = round(duration.as('d'));
	    var months   = round(duration.as('M'));
	    var years    = round(duration.as('y'));

	    var a = seconds < thresholds.s && ['s', seconds]  ||
	            minutes <= 1           && ['m']           ||
	            minutes < thresholds.m && ['mm', minutes] ||
	            hours   <= 1           && ['h']           ||
	            hours   < thresholds.h && ['hh', hours]   ||
	            days    <= 1           && ['d']           ||
	            days    < thresholds.d && ['dd', days]    ||
	            months  <= 1           && ['M']           ||
	            months  < thresholds.M && ['MM', months]  ||
	            years   <= 1           && ['y']           || ['yy', years];

	    a[2] = withoutSuffix;
	    a[3] = +posNegDuration > 0;
	    a[4] = locale;
	    return substituteTimeAgo.apply(null, a);
	}

	// This function allows you to set the rounding function for relative time strings
	function getSetRelativeTimeRounding (roundingFunction) {
	    if (roundingFunction === undefined) {
	        return round;
	    }
	    if (typeof(roundingFunction) === 'function') {
	        round = roundingFunction;
	        return true;
	    }
	    return false;
	}

	// This function allows you to set a threshold for relative time strings
	function getSetRelativeTimeThreshold (threshold, limit) {
	    if (thresholds[threshold] === undefined) {
	        return false;
	    }
	    if (limit === undefined) {
	        return thresholds[threshold];
	    }
	    thresholds[threshold] = limit;
	    return true;
	}

	function humanize (withSuffix) {
	    var locale = this.localeData();
	    var output = relativeTime$1(this, !withSuffix, locale);

	    if (withSuffix) {
	        output = locale.pastFuture(+this, output);
	    }

	    return locale.postformat(output);
	}

	var abs$1 = Math.abs;

	function toISOString$1() {
	    // for ISO strings we do not use the normal bubbling rules:
	    //  * milliseconds bubble up until they become hours
	    //  * days do not bubble at all
	    //  * months bubble up until they become years
	    // This is because there is no context-free conversion between hours and days
	    // (think of clock changes)
	    // and also not between days and months (28-31 days per month)
	    var seconds = abs$1(this._milliseconds) / 1000;
	    var days         = abs$1(this._days);
	    var months       = abs$1(this._months);
	    var minutes, hours, years;

	    // 3600 seconds -> 60 minutes -> 1 hour
	    minutes           = absFloor(seconds / 60);
	    hours             = absFloor(minutes / 60);
	    seconds %= 60;
	    minutes %= 60;

	    // 12 months -> 1 year
	    years  = absFloor(months / 12);
	    months %= 12;


	    // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
	    var Y = years;
	    var M = months;
	    var D = days;
	    var h = hours;
	    var m = minutes;
	    var s = seconds;
	    var total = this.asSeconds();

	    if (!total) {
	        // this is the same as C#'s (Noda) and python (isodate)...
	        // but not other JS (goog.date)
	        return 'P0D';
	    }

	    return (total < 0 ? '-' : '') +
	        'P' +
	        (Y ? Y + 'Y' : '') +
	        (M ? M + 'M' : '') +
	        (D ? D + 'D' : '') +
	        ((h || m || s) ? 'T' : '') +
	        (h ? h + 'H' : '') +
	        (m ? m + 'M' : '') +
	        (s ? s + 'S' : '');
	}

	var proto$2 = Duration.prototype;

	proto$2.abs            = abs;
	proto$2.add            = add$1;
	proto$2.subtract       = subtract$1;
	proto$2.as             = as;
	proto$2.asMilliseconds = asMilliseconds;
	proto$2.asSeconds      = asSeconds;
	proto$2.asMinutes      = asMinutes;
	proto$2.asHours        = asHours;
	proto$2.asDays         = asDays;
	proto$2.asWeeks        = asWeeks;
	proto$2.asMonths       = asMonths;
	proto$2.asYears        = asYears;
	proto$2.valueOf        = valueOf$1;
	proto$2._bubble        = bubble;
	proto$2.get            = get$2;
	proto$2.milliseconds   = milliseconds;
	proto$2.seconds        = seconds;
	proto$2.minutes        = minutes;
	proto$2.hours          = hours;
	proto$2.days           = days;
	proto$2.weeks          = weeks;
	proto$2.months         = months;
	proto$2.years          = years;
	proto$2.humanize       = humanize;
	proto$2.toISOString    = toISOString$1;
	proto$2.toString       = toISOString$1;
	proto$2.toJSON         = toISOString$1;
	proto$2.locale         = locale;
	proto$2.localeData     = localeData;

	// Deprecations
	proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
	proto$2.lang = lang;

	// Side effect imports

	// FORMATTING

	addFormatToken('X', 0, 0, 'unix');
	addFormatToken('x', 0, 0, 'valueOf');

	// PARSING

	addRegexToken('x', matchSigned);
	addRegexToken('X', matchTimestamp);
	addParseToken('X', function (input, array, config) {
	    config._d = new Date(parseFloat(input, 10) * 1000);
	});
	addParseToken('x', function (input, array, config) {
	    config._d = new Date(toInt(input));
	});

	// Side effect imports


	hooks.version = '2.17.1';

	setHookCallback(createLocal);

	hooks.fn                    = proto;
	hooks.min                   = min;
	hooks.max                   = max;
	hooks.now                   = now;
	hooks.utc                   = createUTC;
	hooks.unix                  = createUnix;
	hooks.months                = listMonths;
	hooks.isDate                = isDate;
	hooks.locale                = getSetGlobalLocale;
	hooks.invalid               = createInvalid;
	hooks.duration              = createDuration;
	hooks.isMoment              = isMoment;
	hooks.weekdays              = listWeekdays;
	hooks.parseZone             = createInZone;
	hooks.localeData            = getLocale;
	hooks.isDuration            = isDuration;
	hooks.monthsShort           = listMonthsShort;
	hooks.weekdaysMin           = listWeekdaysMin;
	hooks.defineLocale          = defineLocale;
	hooks.updateLocale          = updateLocale;
	hooks.locales               = listLocales;
	hooks.weekdaysShort         = listWeekdaysShort;
	hooks.normalizeUnits        = normalizeUnits;
	hooks.relativeTimeRounding = getSetRelativeTimeRounding;
	hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
	hooks.calendarFormat        = getCalendarFormat;
	hooks.prototype             = proto;

	return hooks;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(122)(module)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(114);
	module.exports = later;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Afrikaans [af]
	//! author : Werner Mollentze : https://github.com/wernerm

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var af = moment.defineLocale('af', {
	    months : 'Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember'.split('_'),
	    monthsShort : 'Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des'.split('_'),
	    weekdays : 'Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag'.split('_'),
	    weekdaysShort : 'Son_Maa_Din_Woe_Don_Vry_Sat'.split('_'),
	    weekdaysMin : 'So_Ma_Di_Wo_Do_Vr_Sa'.split('_'),
	    meridiemParse: /vm|nm/i,
	    isPM : function (input) {
	        return /^nm$/i.test(input);
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 12) {
	            return isLower ? 'vm' : 'VM';
	        } else {
	            return isLower ? 'nm' : 'NM';
	        }
	    },
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Vandag om] LT',
	        nextDay : '[Môre om] LT',
	        nextWeek : 'dddd [om] LT',
	        lastDay : '[Gister om] LT',
	        lastWeek : '[Laas] dddd [om] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'oor %s',
	        past : '%s gelede',
	        s : '\'n paar sekondes',
	        m : '\'n minuut',
	        mm : '%d minute',
	        h : '\'n uur',
	        hh : '%d ure',
	        d : '\'n dag',
	        dd : '%d dae',
	        M : '\'n maand',
	        MM : '%d maande',
	        y : '\'n jaar',
	        yy : '%d jaar'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de'); // Thanks to Joris Röling : https://github.com/jjupiter
	    },
	    week : {
	        dow : 1, // Maandag is die eerste dag van die week.
	        doy : 4  // Die week wat die 4de Januarie bevat is die eerste week van die jaar.
	    }
	});

	return af;

	})));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Algeria) [ar-dz]
	//! author : Noureddine LOUAHEDJ : https://github.com/noureddineme

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var arDz = moment.defineLocale('ar-dz', {
	    months : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    monthsShort : 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'أح_إث_ثلا_أر_خم_جم_سب'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'في %s',
	        past : 'منذ %s',
	        s : 'ثوان',
	        m : 'دقيقة',
	        mm : '%d دقائق',
	        h : 'ساعة',
	        hh : '%d ساعات',
	        d : 'يوم',
	        dd : '%d أيام',
	        M : 'شهر',
	        MM : '%d أشهر',
	        y : 'سنة',
	        yy : '%d سنوات'
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 4  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return arDz;

	})));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Lybia) [ar-ly]
	//! author : Ali Hmer: https://github.com/kikoanis

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '1',
	    '2': '2',
	    '3': '3',
	    '4': '4',
	    '5': '5',
	    '6': '6',
	    '7': '7',
	    '8': '8',
	    '9': '9',
	    '0': '0'
	};
	var pluralForm = function (n) {
	    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	};
	var plurals = {
	    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	};
	var pluralize = function (u) {
	    return function (number, withoutSuffix, string, isFuture) {
	        var f = pluralForm(number),
	            str = plurals[u][pluralForm(number)];
	        if (f === 2) {
	            str = str[withoutSuffix ? 0 : 1];
	        }
	        return str.replace(/%d/i, number);
	    };
	};
	var months = [
	    'يناير',
	    'فبراير',
	    'مارس',
	    'أبريل',
	    'مايو',
	    'يونيو',
	    'يوليو',
	    'أغسطس',
	    'سبتمبر',
	    'أكتوبر',
	    'نوفمبر',
	    'ديسمبر'
	];

	var arLy = moment.defineLocale('ar-ly', {
	    months : months,
	    monthsShort : months,
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'D/\u200FM/\u200FYYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ص|م/,
	    isPM : function (input) {
	        return 'م' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ص';
	        } else {
	            return 'م';
	        }
	    },
	    calendar : {
	        sameDay: '[اليوم عند الساعة] LT',
	        nextDay: '[غدًا عند الساعة] LT',
	        nextWeek: 'dddd [عند الساعة] LT',
	        lastDay: '[أمس عند الساعة] LT',
	        lastWeek: 'dddd [عند الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'بعد %s',
	        past : 'منذ %s',
	        s : pluralize('s'),
	        m : pluralize('m'),
	        mm : pluralize('m'),
	        h : pluralize('h'),
	        hh : pluralize('h'),
	        d : pluralize('d'),
	        dd : pluralize('d'),
	        M : pluralize('M'),
	        MM : pluralize('M'),
	        y : pluralize('y'),
	        yy : pluralize('y')
	    },
	    preparse: function (string) {
	        return string.replace(/\u200f/g, '').replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return arLy;

	})));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Morocco) [ar-ma]
	//! author : ElFadili Yassine : https://github.com/ElFadiliY
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var arMa = moment.defineLocale('ar-ma', {
	    months : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	    monthsShort : 'يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر'.split('_'),
	    weekdays : 'الأحد_الإتنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'احد_اتنين_ثلاثاء_اربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'في %s',
	        past : 'منذ %s',
	        s : 'ثوان',
	        m : 'دقيقة',
	        mm : '%d دقائق',
	        h : 'ساعة',
	        hh : '%d ساعات',
	        d : 'يوم',
	        dd : '%d أيام',
	        M : 'شهر',
	        MM : '%d أشهر',
	        y : 'سنة',
	        yy : '%d سنوات'
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return arMa;

	})));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic (Saudi Arabia) [ar-sa]
	//! author : Suhail Alkowaileet : https://github.com/xsoh

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '١',
	    '2': '٢',
	    '3': '٣',
	    '4': '٤',
	    '5': '٥',
	    '6': '٦',
	    '7': '٧',
	    '8': '٨',
	    '9': '٩',
	    '0': '٠'
	};
	var numberMap = {
	    '١': '1',
	    '٢': '2',
	    '٣': '3',
	    '٤': '4',
	    '٥': '5',
	    '٦': '6',
	    '٧': '7',
	    '٨': '8',
	    '٩': '9',
	    '٠': '0'
	};

	var arSa = moment.defineLocale('ar-sa', {
	    months : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    monthsShort : 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ص|م/,
	    isPM : function (input) {
	        return 'م' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ص';
	        } else {
	            return 'م';
	        }
	    },
	    calendar : {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'في %s',
	        past : 'منذ %s',
	        s : 'ثوان',
	        m : 'دقيقة',
	        mm : '%d دقائق',
	        h : 'ساعة',
	        hh : '%d ساعات',
	        d : 'يوم',
	        dd : '%d أيام',
	        M : 'شهر',
	        MM : '%d أشهر',
	        y : 'سنة',
	        yy : '%d سنوات'
	    },
	    preparse: function (string) {
	        return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	            return numberMap[match];
	        }).replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return arSa;

	})));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale  :  Arabic (Tunisia) [ar-tn]
	//! author : Nader Toukabri : https://github.com/naderio

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var arTn = moment.defineLocale('ar-tn', {
	    months: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    monthsShort: 'جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
	    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[اليوم على الساعة] LT',
	        nextDay: '[غدا على الساعة] LT',
	        nextWeek: 'dddd [على الساعة] LT',
	        lastDay: '[أمس على الساعة] LT',
	        lastWeek: 'dddd [على الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'في %s',
	        past: 'منذ %s',
	        s: 'ثوان',
	        m: 'دقيقة',
	        mm: '%d دقائق',
	        h: 'ساعة',
	        hh: '%d ساعات',
	        d: 'يوم',
	        dd: '%d أيام',
	        M: 'شهر',
	        MM: '%d أشهر',
	        y: 'سنة',
	        yy: '%d سنوات'
	    },
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4 // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return arTn;

	})));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Arabic [ar]
	//! author : Abdel Said: https://github.com/abdelsaid
	//! author : Ahmed Elkhatib
	//! author : forabi https://github.com/forabi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '١',
	    '2': '٢',
	    '3': '٣',
	    '4': '٤',
	    '5': '٥',
	    '6': '٦',
	    '7': '٧',
	    '8': '٨',
	    '9': '٩',
	    '0': '٠'
	};
	var numberMap = {
	    '١': '1',
	    '٢': '2',
	    '٣': '3',
	    '٤': '4',
	    '٥': '5',
	    '٦': '6',
	    '٧': '7',
	    '٨': '8',
	    '٩': '9',
	    '٠': '0'
	};
	var pluralForm = function (n) {
	    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5;
	};
	var plurals = {
	    s : ['أقل من ثانية', 'ثانية واحدة', ['ثانيتان', 'ثانيتين'], '%d ثوان', '%d ثانية', '%d ثانية'],
	    m : ['أقل من دقيقة', 'دقيقة واحدة', ['دقيقتان', 'دقيقتين'], '%d دقائق', '%d دقيقة', '%d دقيقة'],
	    h : ['أقل من ساعة', 'ساعة واحدة', ['ساعتان', 'ساعتين'], '%d ساعات', '%d ساعة', '%d ساعة'],
	    d : ['أقل من يوم', 'يوم واحد', ['يومان', 'يومين'], '%d أيام', '%d يومًا', '%d يوم'],
	    M : ['أقل من شهر', 'شهر واحد', ['شهران', 'شهرين'], '%d أشهر', '%d شهرا', '%d شهر'],
	    y : ['أقل من عام', 'عام واحد', ['عامان', 'عامين'], '%d أعوام', '%d عامًا', '%d عام']
	};
	var pluralize = function (u) {
	    return function (number, withoutSuffix, string, isFuture) {
	        var f = pluralForm(number),
	            str = plurals[u][pluralForm(number)];
	        if (f === 2) {
	            str = str[withoutSuffix ? 0 : 1];
	        }
	        return str.replace(/%d/i, number);
	    };
	};
	var months = [
	    'كانون الثاني يناير',
	    'شباط فبراير',
	    'آذار مارس',
	    'نيسان أبريل',
	    'أيار مايو',
	    'حزيران يونيو',
	    'تموز يوليو',
	    'آب أغسطس',
	    'أيلول سبتمبر',
	    'تشرين الأول أكتوبر',
	    'تشرين الثاني نوفمبر',
	    'كانون الأول ديسمبر'
	];

	var ar = moment.defineLocale('ar', {
	    months : months,
	    monthsShort : months,
	    weekdays : 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
	    weekdaysShort : 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
	    weekdaysMin : 'ح_ن_ث_ر_خ_ج_س'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'D/\u200FM/\u200FYYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ص|م/,
	    isPM : function (input) {
	        return 'م' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ص';
	        } else {
	            return 'م';
	        }
	    },
	    calendar : {
	        sameDay: '[اليوم عند الساعة] LT',
	        nextDay: '[غدًا عند الساعة] LT',
	        nextWeek: 'dddd [عند الساعة] LT',
	        lastDay: '[أمس عند الساعة] LT',
	        lastWeek: 'dddd [عند الساعة] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'بعد %s',
	        past : 'منذ %s',
	        s : pluralize('s'),
	        m : pluralize('m'),
	        mm : pluralize('m'),
	        h : pluralize('h'),
	        hh : pluralize('h'),
	        d : pluralize('d'),
	        dd : pluralize('d'),
	        M : pluralize('M'),
	        MM : pluralize('M'),
	        y : pluralize('y'),
	        yy : pluralize('y')
	    },
	    preparse: function (string) {
	        return string.replace(/\u200f/g, '').replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
	            return numberMap[match];
	        }).replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ar;

	})));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Azerbaijani [az]
	//! author : topchiyev : https://github.com/topchiyev

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var suffixes = {
	    1: '-inci',
	    5: '-inci',
	    8: '-inci',
	    70: '-inci',
	    80: '-inci',
	    2: '-nci',
	    7: '-nci',
	    20: '-nci',
	    50: '-nci',
	    3: '-üncü',
	    4: '-üncü',
	    100: '-üncü',
	    6: '-ncı',
	    9: '-uncu',
	    10: '-uncu',
	    30: '-uncu',
	    60: '-ıncı',
	    90: '-ıncı'
	};

	var az = moment.defineLocale('az', {
	    months : 'yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr'.split('_'),
	    monthsShort : 'yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek'.split('_'),
	    weekdays : 'Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə'.split('_'),
	    weekdaysShort : 'Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən'.split('_'),
	    weekdaysMin : 'Bz_BE_ÇA_Çə_CA_Cü_Şə'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[bugün saat] LT',
	        nextDay : '[sabah saat] LT',
	        nextWeek : '[gələn həftə] dddd [saat] LT',
	        lastDay : '[dünən] LT',
	        lastWeek : '[keçən həftə] dddd [saat] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s sonra',
	        past : '%s əvvəl',
	        s : 'birneçə saniyyə',
	        m : 'bir dəqiqə',
	        mm : '%d dəqiqə',
	        h : 'bir saat',
	        hh : '%d saat',
	        d : 'bir gün',
	        dd : '%d gün',
	        M : 'bir ay',
	        MM : '%d ay',
	        y : 'bir il',
	        yy : '%d il'
	    },
	    meridiemParse: /gecə|səhər|gündüz|axşam/,
	    isPM : function (input) {
	        return /^(gündüz|axşam)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'gecə';
	        } else if (hour < 12) {
	            return 'səhər';
	        } else if (hour < 17) {
	            return 'gündüz';
	        } else {
	            return 'axşam';
	        }
	    },
	    ordinalParse: /\d{1,2}-(ıncı|inci|nci|üncü|ncı|uncu)/,
	    ordinal : function (number) {
	        if (number === 0) {  // special case for zero
	            return number + '-ıncı';
	        }
	        var a = number % 10,
	            b = number % 100 - a,
	            c = number >= 100 ? 100 : null;
	        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return az;

	})));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Belarusian [be]
	//! author : Dmitry Demidov : https://github.com/demidov91
	//! author: Praleska: http://praleska.pro/
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function plural(word, num) {
	    var forms = word.split('_');
	    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	        'mm': withoutSuffix ? 'хвіліна_хвіліны_хвілін' : 'хвіліну_хвіліны_хвілін',
	        'hh': withoutSuffix ? 'гадзіна_гадзіны_гадзін' : 'гадзіну_гадзіны_гадзін',
	        'dd': 'дзень_дні_дзён',
	        'MM': 'месяц_месяцы_месяцаў',
	        'yy': 'год_гады_гадоў'
	    };
	    if (key === 'm') {
	        return withoutSuffix ? 'хвіліна' : 'хвіліну';
	    }
	    else if (key === 'h') {
	        return withoutSuffix ? 'гадзіна' : 'гадзіну';
	    }
	    else {
	        return number + ' ' + plural(format[key], +number);
	    }
	}

	var be = moment.defineLocale('be', {
	    months : {
	        format: 'студзеня_лютага_сакавіка_красавіка_траўня_чэрвеня_ліпеня_жніўня_верасня_кастрычніка_лістапада_снежня'.split('_'),
	        standalone: 'студзень_люты_сакавік_красавік_травень_чэрвень_ліпень_жнівень_верасень_кастрычнік_лістапад_снежань'.split('_')
	    },
	    monthsShort : 'студ_лют_сак_крас_трав_чэрв_ліп_жнів_вер_каст_ліст_снеж'.split('_'),
	    weekdays : {
	        format: 'нядзелю_панядзелак_аўторак_сераду_чацвер_пятніцу_суботу'.split('_'),
	        standalone: 'нядзеля_панядзелак_аўторак_серада_чацвер_пятніца_субота'.split('_'),
	        isFormat: /\[ ?[Вв] ?(?:мінулую|наступную)? ?\] ?dddd/
	    },
	    weekdaysShort : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	    weekdaysMin : 'нд_пн_ат_ср_чц_пт_сб'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY г.',
	        LLL : 'D MMMM YYYY г., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	    },
	    calendar : {
	        sameDay: '[Сёння ў] LT',
	        nextDay: '[Заўтра ў] LT',
	        lastDay: '[Учора ў] LT',
	        nextWeek: function () {
	            return '[У] dddd [ў] LT';
	        },
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return '[У мінулую] dddd [ў] LT';
	                case 1:
	                case 2:
	                case 4:
	                    return '[У мінулы] dddd [ў] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'праз %s',
	        past : '%s таму',
	        s : 'некалькі секунд',
	        m : relativeTimeWithPlural,
	        mm : relativeTimeWithPlural,
	        h : relativeTimeWithPlural,
	        hh : relativeTimeWithPlural,
	        d : 'дзень',
	        dd : relativeTimeWithPlural,
	        M : 'месяц',
	        MM : relativeTimeWithPlural,
	        y : 'год',
	        yy : relativeTimeWithPlural
	    },
	    meridiemParse: /ночы|раніцы|дня|вечара/,
	    isPM : function (input) {
	        return /^(дня|вечара)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ночы';
	        } else if (hour < 12) {
	            return 'раніцы';
	        } else if (hour < 17) {
	            return 'дня';
	        } else {
	            return 'вечара';
	        }
	    },
	    ordinalParse: /\d{1,2}-(і|ы|га)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return (number % 10 === 2 || number % 10 === 3) && (number % 100 !== 12 && number % 100 !== 13) ? number + '-і' : number + '-ы';
	            case 'D':
	                return number + '-га';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return be;

	})));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bulgarian [bg]
	//! author : Krasen Borisov : https://github.com/kraz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var bg = moment.defineLocale('bg', {
	    months : 'януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември'.split('_'),
	    monthsShort : 'янр_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек'.split('_'),
	    weekdays : 'неделя_понеделник_вторник_сряда_четвъртък_петък_събота'.split('_'),
	    weekdaysShort : 'нед_пон_вто_сря_чет_пет_съб'.split('_'),
	    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'D.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd, D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay : '[Днес в] LT',
	        nextDay : '[Утре в] LT',
	        nextWeek : 'dddd [в] LT',
	        lastDay : '[Вчера в] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[В изминалата] dddd [в] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[В изминалия] dddd [в] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'след %s',
	        past : 'преди %s',
	        s : 'няколко секунди',
	        m : 'минута',
	        mm : '%d минути',
	        h : 'час',
	        hh : '%d часа',
	        d : 'ден',
	        dd : '%d дни',
	        M : 'месец',
	        MM : '%d месеца',
	        y : 'година',
	        yy : '%d години'
	    },
	    ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	    ordinal : function (number) {
	        var lastDigit = number % 10,
	            last2Digits = number % 100;
	        if (number === 0) {
	            return number + '-ев';
	        } else if (last2Digits === 0) {
	            return number + '-ен';
	        } else if (last2Digits > 10 && last2Digits < 20) {
	            return number + '-ти';
	        } else if (lastDigit === 1) {
	            return number + '-ви';
	        } else if (lastDigit === 2) {
	            return number + '-ри';
	        } else if (lastDigit === 7 || lastDigit === 8) {
	            return number + '-ми';
	        } else {
	            return number + '-ти';
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return bg;

	})));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bengali [bn]
	//! author : Kaushik Gandhi : https://github.com/kaushikgandhi

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '১',
	    '2': '২',
	    '3': '৩',
	    '4': '৪',
	    '5': '৫',
	    '6': '৬',
	    '7': '৭',
	    '8': '৮',
	    '9': '৯',
	    '0': '০'
	};
	var numberMap = {
	    '১': '1',
	    '২': '2',
	    '৩': '3',
	    '৪': '4',
	    '৫': '5',
	    '৬': '6',
	    '৭': '7',
	    '৮': '8',
	    '৯': '9',
	    '০': '0'
	};

	var bn = moment.defineLocale('bn', {
	    months : 'জানুয়ারী_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর'.split('_'),
	    monthsShort : 'জানু_ফেব_মার্চ_এপ্র_মে_জুন_জুল_আগ_সেপ্ট_অক্টো_নভে_ডিসে'.split('_'),
	    weekdays : 'রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার'.split('_'),
	    weekdaysShort : 'রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি'.split('_'),
	    weekdaysMin : 'রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm সময়',
	        LTS : 'A h:mm:ss সময়',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm সময়',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm সময়'
	    },
	    calendar : {
	        sameDay : '[আজ] LT',
	        nextDay : '[আগামীকাল] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[গতকাল] LT',
	        lastWeek : '[গত] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s পরে',
	        past : '%s আগে',
	        s : 'কয়েক সেকেন্ড',
	        m : 'এক মিনিট',
	        mm : '%d মিনিট',
	        h : 'এক ঘন্টা',
	        hh : '%d ঘন্টা',
	        d : 'এক দিন',
	        dd : '%d দিন',
	        M : 'এক মাস',
	        MM : '%d মাস',
	        y : 'এক বছর',
	        yy : '%d বছর'
	    },
	    preparse: function (string) {
	        return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /রাত|সকাল|দুপুর|বিকাল|রাত/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if ((meridiem === 'রাত' && hour >= 4) ||
	                (meridiem === 'দুপুর' && hour < 5) ||
	                meridiem === 'বিকাল') {
	            return hour + 12;
	        } else {
	            return hour;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'রাত';
	        } else if (hour < 10) {
	            return 'সকাল';
	        } else if (hour < 17) {
	            return 'দুপুর';
	        } else if (hour < 20) {
	            return 'বিকাল';
	        } else {
	            return 'রাত';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return bn;

	})));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tibetan [bo]
	//! author : Thupten N. Chakrishar : https://github.com/vajradog

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '༡',
	    '2': '༢',
	    '3': '༣',
	    '4': '༤',
	    '5': '༥',
	    '6': '༦',
	    '7': '༧',
	    '8': '༨',
	    '9': '༩',
	    '0': '༠'
	};
	var numberMap = {
	    '༡': '1',
	    '༢': '2',
	    '༣': '3',
	    '༤': '4',
	    '༥': '5',
	    '༦': '6',
	    '༧': '7',
	    '༨': '8',
	    '༩': '9',
	    '༠': '0'
	};

	var bo = moment.defineLocale('bo', {
	    months : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	    monthsShort : 'ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ'.split('_'),
	    weekdays : 'གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་'.split('_'),
	    weekdaysShort : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	    weekdaysMin : 'ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm',
	        LTS : 'A h:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm'
	    },
	    calendar : {
	        sameDay : '[དི་རིང] LT',
	        nextDay : '[སང་ཉིན] LT',
	        nextWeek : '[བདུན་ཕྲག་རྗེས་མ], LT',
	        lastDay : '[ཁ་སང] LT',
	        lastWeek : '[བདུན་ཕྲག་མཐའ་མ] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ལ་',
	        past : '%s སྔན་ལ',
	        s : 'ལམ་སང',
	        m : 'སྐར་མ་གཅིག',
	        mm : '%d སྐར་མ',
	        h : 'ཆུ་ཚོད་གཅིག',
	        hh : '%d ཆུ་ཚོད',
	        d : 'ཉིན་གཅིག',
	        dd : '%d ཉིན་',
	        M : 'ཟླ་བ་གཅིག',
	        MM : '%d ཟླ་བ',
	        y : 'ལོ་གཅིག',
	        yy : '%d ལོ'
	    },
	    preparse: function (string) {
	        return string.replace(/[༡༢༣༤༥༦༧༨༩༠]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /མཚན་མོ|ཞོགས་ཀས|ཉིན་གུང|དགོང་དག|མཚན་མོ/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if ((meridiem === 'མཚན་མོ' && hour >= 4) ||
	                (meridiem === 'ཉིན་གུང' && hour < 5) ||
	                meridiem === 'དགོང་དག') {
	            return hour + 12;
	        } else {
	            return hour;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'མཚན་མོ';
	        } else if (hour < 10) {
	            return 'ཞོགས་ཀས';
	        } else if (hour < 17) {
	            return 'ཉིན་གུང';
	        } else if (hour < 20) {
	            return 'དགོང་དག';
	        } else {
	            return 'མཚན་མོ';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return bo;

	})));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Breton [br]
	//! author : Jean-Baptiste Le Duigou : https://github.com/jbleduigou

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function relativeTimeWithMutation(number, withoutSuffix, key) {
	    var format = {
	        'mm': 'munutenn',
	        'MM': 'miz',
	        'dd': 'devezh'
	    };
	    return number + ' ' + mutation(format[key], number);
	}
	function specialMutationForYears(number) {
	    switch (lastNumber(number)) {
	        case 1:
	        case 3:
	        case 4:
	        case 5:
	        case 9:
	            return number + ' bloaz';
	        default:
	            return number + ' vloaz';
	    }
	}
	function lastNumber(number) {
	    if (number > 9) {
	        return lastNumber(number % 10);
	    }
	    return number;
	}
	function mutation(text, number) {
	    if (number === 2) {
	        return softMutation(text);
	    }
	    return text;
	}
	function softMutation(text) {
	    var mutationTable = {
	        'm': 'v',
	        'b': 'v',
	        'd': 'z'
	    };
	    if (mutationTable[text.charAt(0)] === undefined) {
	        return text;
	    }
	    return mutationTable[text.charAt(0)] + text.substring(1);
	}

	var br = moment.defineLocale('br', {
	    months : 'Genver_C\'hwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu'.split('_'),
	    monthsShort : 'Gen_C\'hwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker'.split('_'),
	    weekdays : 'Sul_Lun_Meurzh_Merc\'her_Yaou_Gwener_Sadorn'.split('_'),
	    weekdaysShort : 'Sul_Lun_Meu_Mer_Yao_Gwe_Sad'.split('_'),
	    weekdaysMin : 'Su_Lu_Me_Mer_Ya_Gw_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'h[e]mm A',
	        LTS : 'h[e]mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D [a viz] MMMM YYYY',
	        LLL : 'D [a viz] MMMM YYYY h[e]mm A',
	        LLLL : 'dddd, D [a viz] MMMM YYYY h[e]mm A'
	    },
	    calendar : {
	        sameDay : '[Hiziv da] LT',
	        nextDay : '[Warc\'hoazh da] LT',
	        nextWeek : 'dddd [da] LT',
	        lastDay : '[Dec\'h da] LT',
	        lastWeek : 'dddd [paset da] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'a-benn %s',
	        past : '%s \'zo',
	        s : 'un nebeud segondennoù',
	        m : 'ur vunutenn',
	        mm : relativeTimeWithMutation,
	        h : 'un eur',
	        hh : '%d eur',
	        d : 'un devezh',
	        dd : relativeTimeWithMutation,
	        M : 'ur miz',
	        MM : relativeTimeWithMutation,
	        y : 'ur bloaz',
	        yy : specialMutationForYears
	    },
	    ordinalParse: /\d{1,2}(añ|vet)/,
	    ordinal : function (number) {
	        var output = (number === 1) ? 'añ' : 'vet';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return br;

	})));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Bosnian [bs]
	//! author : Nedim Cholich : https://github.com/frontyard
	//! based on (hr) translation by Bojan Marković

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function translate(number, withoutSuffix, key) {
	    var result = number + ' ';
	    switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	    }
	}

	var bs = moment.defineLocale('bs', {
	    months : 'januar_februar_mart_april_maj_juni_juli_august_septembar_oktobar_novembar_decembar'.split('_'),
	    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._aug._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[danas u] LT',
	        nextDay  : '[sutra u] LT',
	        nextWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[jučer u] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'prije %s',
	        s      : 'par sekundi',
	        m      : translate,
	        mm     : translate,
	        h      : translate,
	        hh     : translate,
	        d      : 'dan',
	        dd     : translate,
	        M      : 'mjesec',
	        MM     : translate,
	        y      : 'godinu',
	        yy     : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return bs;

	})));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Catalan [ca]
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ca = moment.defineLocale('ca', {
	    months : 'gener_febrer_març_abril_maig_juny_juliol_agost_setembre_octubre_novembre_desembre'.split('_'),
	    monthsShort : 'gen._febr._mar._abr._mai._jun._jul._ag._set._oct._nov._des.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'diumenge_dilluns_dimarts_dimecres_dijous_divendres_dissabte'.split('_'),
	    weekdaysShort : 'dg._dl._dt._dc._dj._dv._ds.'.split('_'),
	    weekdaysMin : 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[avui a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        nextDay : function () {
	            return '[demà a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        lastDay : function () {
	            return '[ahir a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        lastWeek : function () {
	            return '[el] dddd [passat a ' + ((this.hours() !== 1) ? 'les' : 'la') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'd\'aquí %s',
	        past : 'fa %s',
	        s : 'uns segons',
	        m : 'un minut',
	        mm : '%d minuts',
	        h : 'una hora',
	        hh : '%d hores',
	        d : 'un dia',
	        dd : '%d dies',
	        M : 'un mes',
	        MM : '%d mesos',
	        y : 'un any',
	        yy : '%d anys'
	    },
	    ordinalParse: /\d{1,2}(r|n|t|è|a)/,
	    ordinal : function (number, period) {
	        var output = (number === 1) ? 'r' :
	            (number === 2) ? 'n' :
	            (number === 3) ? 'r' :
	            (number === 4) ? 't' : 'è';
	        if (period === 'w' || period === 'W') {
	            output = 'a';
	        }
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return ca;

	})));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Czech [cs]
	//! author : petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var months = 'leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec'.split('_');
	var monthsShort = 'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'.split('_');
	function plural(n) {
	    return (n > 1) && (n < 5) && (~~(n / 10) !== 1);
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekund' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minuta' : (isFuture ? 'minutu' : 'minutou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minuty' : 'minut');
	            } else {
	                return result + 'minutami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodin');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'den' : 'dnem';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dny' : 'dní');
	            } else {
	                return result + 'dny';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'měsíc' : 'měsícem';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'měsíce' : 'měsíců');
	            } else {
	                return result + 'měsíci';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokem';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'let');
	            } else {
	                return result + 'lety';
	            }
	            break;
	    }
	}

	var cs = moment.defineLocale('cs', {
	    months : months,
	    monthsShort : monthsShort,
	    monthsParse : (function (months, monthsShort) {
	        var i, _monthsParse = [];
	        for (i = 0; i < 12; i++) {
	            // use custom parser to solve problem with July (červenec)
	            _monthsParse[i] = new RegExp('^' + months[i] + '$|^' + monthsShort[i] + '$', 'i');
	        }
	        return _monthsParse;
	    }(months, monthsShort)),
	    shortMonthsParse : (function (monthsShort) {
	        var i, _shortMonthsParse = [];
	        for (i = 0; i < 12; i++) {
	            _shortMonthsParse[i] = new RegExp('^' + monthsShort[i] + '$', 'i');
	        }
	        return _shortMonthsParse;
	    }(monthsShort)),
	    longMonthsParse : (function (months) {
	        var i, _longMonthsParse = [];
	        for (i = 0; i < 12; i++) {
	            _longMonthsParse[i] = new RegExp('^' + months[i] + '$', 'i');
	        }
	        return _longMonthsParse;
	    }(months)),
	    weekdays : 'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'.split('_'),
	    weekdaysShort : 'ne_po_út_st_čt_pá_so'.split('_'),
	    weekdaysMin : 'ne_po_út_st_čt_pá_so'.split('_'),
	    longDateFormat : {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd D. MMMM YYYY H:mm',
	        l : 'D. M. YYYY'
	    },
	    calendar : {
	        sameDay: '[dnes v] LT',
	        nextDay: '[zítra v] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[v neděli v] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [v] LT';
	                case 3:
	                    return '[ve středu v] LT';
	                case 4:
	                    return '[ve čtvrtek v] LT';
	                case 5:
	                    return '[v pátek v] LT';
	                case 6:
	                    return '[v sobotu v] LT';
	            }
	        },
	        lastDay: '[včera v] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[minulou neděli v] LT';
	                case 1:
	                case 2:
	                    return '[minulé] dddd [v] LT';
	                case 3:
	                    return '[minulou středu v] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [v] LT';
	                case 6:
	                    return '[minulou sobotu v] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past : 'před %s',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse : /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return cs;

	})));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chuvash [cv]
	//! author : Anatoly Mironov : https://github.com/mirontoli

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var cv = moment.defineLocale('cv', {
	    months : 'кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав'.split('_'),
	    monthsShort : 'кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш'.split('_'),
	    weekdays : 'вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун'.split('_'),
	    weekdaysShort : 'выр_тун_ытл_юн_кӗҫ_эрн_шӑм'.split('_'),
	    weekdaysMin : 'вр_тн_ыт_юн_кҫ_эр_шм'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]',
	        LLL : 'YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm',
	        LLLL : 'dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm'
	    },
	    calendar : {
	        sameDay: '[Паян] LT [сехетре]',
	        nextDay: '[Ыран] LT [сехетре]',
	        lastDay: '[Ӗнер] LT [сехетре]',
	        nextWeek: '[Ҫитес] dddd LT [сехетре]',
	        lastWeek: '[Иртнӗ] dddd LT [сехетре]',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : function (output) {
	            var affix = /сехет$/i.exec(output) ? 'рен' : /ҫул$/i.exec(output) ? 'тан' : 'ран';
	            return output + affix;
	        },
	        past : '%s каялла',
	        s : 'пӗр-ик ҫеккунт',
	        m : 'пӗр минут',
	        mm : '%d минут',
	        h : 'пӗр сехет',
	        hh : '%d сехет',
	        d : 'пӗр кун',
	        dd : '%d кун',
	        M : 'пӗр уйӑх',
	        MM : '%d уйӑх',
	        y : 'пӗр ҫул',
	        yy : '%d ҫул'
	    },
	    ordinalParse: /\d{1,2}-мӗш/,
	    ordinal : '%d-мӗш',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return cv;

	})));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Welsh [cy]
	//! author : Robert Allen : https://github.com/robgallen
	//! author : https://github.com/ryangreaves

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var cy = moment.defineLocale('cy', {
	    months: 'Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr'.split('_'),
	    monthsShort: 'Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag'.split('_'),
	    weekdays: 'Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn'.split('_'),
	    weekdaysShort: 'Sul_Llun_Maw_Mer_Iau_Gwe_Sad'.split('_'),
	    weekdaysMin: 'Su_Ll_Ma_Me_Ia_Gw_Sa'.split('_'),
	    weekdaysParseExact : true,
	    // time formats are the same as en-gb
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[Heddiw am] LT',
	        nextDay: '[Yfory am] LT',
	        nextWeek: 'dddd [am] LT',
	        lastDay: '[Ddoe am] LT',
	        lastWeek: 'dddd [diwethaf am] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'mewn %s',
	        past: '%s yn ôl',
	        s: 'ychydig eiliadau',
	        m: 'munud',
	        mm: '%d munud',
	        h: 'awr',
	        hh: '%d awr',
	        d: 'diwrnod',
	        dd: '%d diwrnod',
	        M: 'mis',
	        MM: '%d mis',
	        y: 'blwyddyn',
	        yy: '%d flynedd'
	    },
	    ordinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
	    // traditional ordinal numbers above 31 are not commonly used in colloquial Welsh
	    ordinal: function (number) {
	        var b = number,
	            output = '',
	            lookup = [
	                '', 'af', 'il', 'ydd', 'ydd', 'ed', 'ed', 'ed', 'fed', 'fed', 'fed', // 1af to 10fed
	                'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'eg', 'fed', 'eg', 'fed' // 11eg to 20fed
	            ];
	        if (b > 20) {
	            if (b === 40 || b === 50 || b === 60 || b === 80 || b === 100) {
	                output = 'fed'; // not 30ain, 70ain or 90ain
	            } else {
	                output = 'ain';
	            }
	        } else if (b > 0) {
	            output = lookup[b];
	        }
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return cy;

	})));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Danish [da]
	//! author : Ulrik Nielsen : https://github.com/mrbase

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var da = moment.defineLocale('da', {
	    months : 'januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	    weekdaysShort : 'søn_man_tir_ons_tor_fre_lør'.split('_'),
	    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY HH:mm',
	        LLLL : 'dddd [d.] D. MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[I dag kl.] LT',
	        nextDay : '[I morgen kl.] LT',
	        nextWeek : 'dddd [kl.] LT',
	        lastDay : '[I går kl.] LT',
	        lastWeek : '[sidste] dddd [kl] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : '%s siden',
	        s : 'få sekunder',
	        m : 'et minut',
	        mm : '%d minutter',
	        h : 'en time',
	        hh : '%d timer',
	        d : 'en dag',
	        dd : '%d dage',
	        M : 'en måned',
	        MM : '%d måneder',
	        y : 'et år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return da;

	})));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : German (Austria) [de-at]
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Martin Groller : https://github.com/MadMG
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        'm': ['eine Minute', 'einer Minute'],
	        'h': ['eine Stunde', 'einer Stunde'],
	        'd': ['ein Tag', 'einem Tag'],
	        'dd': [number + ' Tage', number + ' Tagen'],
	        'M': ['ein Monat', 'einem Monat'],
	        'MM': [number + ' Monate', number + ' Monaten'],
	        'y': ['ein Jahr', 'einem Jahr'],
	        'yy': [number + ' Jahre', number + ' Jahren']
	    };
	    return withoutSuffix ? format[key][0] : format[key][1];
	}

	var deAt = moment.defineLocale('de-at', {
	    months : 'Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	    monthsShort : 'Jän._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY HH:mm',
	        LLLL : 'dddd, D. MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[heute um] LT [Uhr]',
	        sameElse: 'L',
	        nextDay: '[morgen um] LT [Uhr]',
	        nextWeek: 'dddd [um] LT [Uhr]',
	        lastDay: '[gestern um] LT [Uhr]',
	        lastWeek: '[letzten] dddd [um] LT [Uhr]'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : 'vor %s',
	        s : 'ein paar Sekunden',
	        m : processRelativeTime,
	        mm : '%d Minuten',
	        h : processRelativeTime,
	        hh : '%d Stunden',
	        d : processRelativeTime,
	        dd : processRelativeTime,
	        M : processRelativeTime,
	        MM : processRelativeTime,
	        y : processRelativeTime,
	        yy : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return deAt;

	})));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : German [de]
	//! author : lluchs : https://github.com/lluchs
	//! author: Menelion Elensúle: https://github.com/Oire
	//! author : Mikolaj Dadela : https://github.com/mik01aj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        'm': ['eine Minute', 'einer Minute'],
	        'h': ['eine Stunde', 'einer Stunde'],
	        'd': ['ein Tag', 'einem Tag'],
	        'dd': [number + ' Tage', number + ' Tagen'],
	        'M': ['ein Monat', 'einem Monat'],
	        'MM': [number + ' Monate', number + ' Monaten'],
	        'y': ['ein Jahr', 'einem Jahr'],
	        'yy': [number + ' Jahre', number + ' Jahren']
	    };
	    return withoutSuffix ? format[key][0] : format[key][1];
	}

	var de = moment.defineLocale('de', {
	    months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	    monthsShort : 'Jan._Febr._Mrz._Apr._Mai_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
	    weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
	    weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY HH:mm',
	        LLLL : 'dddd, D. MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[heute um] LT [Uhr]',
	        sameElse: 'L',
	        nextDay: '[morgen um] LT [Uhr]',
	        nextWeek: 'dddd [um] LT [Uhr]',
	        lastDay: '[gestern um] LT [Uhr]',
	        lastWeek: '[letzten] dddd [um] LT [Uhr]'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : 'vor %s',
	        s : 'ein paar Sekunden',
	        m : processRelativeTime,
	        mm : '%d Minuten',
	        h : processRelativeTime,
	        hh : '%d Stunden',
	        d : processRelativeTime,
	        dd : processRelativeTime,
	        M : processRelativeTime,
	        MM : processRelativeTime,
	        y : processRelativeTime,
	        yy : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return de;

	})));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Maldivian [dv]
	//! author : Jawish Hameed : https://github.com/jawish

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var months = [
	    'ޖެނުއަރީ',
	    'ފެބްރުއަރީ',
	    'މާރިޗު',
	    'އޭޕްރީލު',
	    'މޭ',
	    'ޖޫން',
	    'ޖުލައި',
	    'އޯގަސްޓު',
	    'ސެޕްޓެމްބަރު',
	    'އޮކްޓޯބަރު',
	    'ނޮވެމްބަރު',
	    'ޑިސެމްބަރު'
	];
	var weekdays = [
	    'އާދިއްތަ',
	    'ހޯމަ',
	    'އަންގާރަ',
	    'ބުދަ',
	    'ބުރާސްފަތި',
	    'ހުކުރު',
	    'ހޮނިހިރު'
	];

	var dv = moment.defineLocale('dv', {
	    months : months,
	    monthsShort : months,
	    weekdays : weekdays,
	    weekdaysShort : weekdays,
	    weekdaysMin : 'އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި'.split('_'),
	    longDateFormat : {

	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'D/M/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /މކ|މފ/,
	    isPM : function (input) {
	        return 'މފ' === input;
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'މކ';
	        } else {
	            return 'މފ';
	        }
	    },
	    calendar : {
	        sameDay : '[މިއަދު] LT',
	        nextDay : '[މާދަމާ] LT',
	        nextWeek : 'dddd LT',
	        lastDay : '[އިއްޔެ] LT',
	        lastWeek : '[ފާއިތުވި] dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ތެރޭގައި %s',
	        past : 'ކުރިން %s',
	        s : 'ސިކުންތުކޮޅެއް',
	        m : 'މިނިޓެއް',
	        mm : 'މިނިޓު %d',
	        h : 'ގަޑިއިރެއް',
	        hh : 'ގަޑިއިރު %d',
	        d : 'ދުވަހެއް',
	        dd : 'ދުވަސް %d',
	        M : 'މަހެއް',
	        MM : 'މަސް %d',
	        y : 'އަހަރެއް',
	        yy : 'އަހަރު %d'
	    },
	    preparse: function (string) {
	        return string.replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/,/g, '،');
	    },
	    week : {
	        dow : 7,  // Sunday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return dv;

	})));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Greek [el]
	//! author : Aggelos Karalias : https://github.com/mehiel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';

	function isFunction(input) {
	    return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
	}


	var el = moment.defineLocale('el', {
	    monthsNominativeEl : 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
	    monthsGenitiveEl : 'Ιανουαρίου_Φεβρουαρίου_Μαρτίου_Απριλίου_Μαΐου_Ιουνίου_Ιουλίου_Αυγούστου_Σεπτεμβρίου_Οκτωβρίου_Νοεμβρίου_Δεκεμβρίου'.split('_'),
	    months : function (momentToFormat, format) {
	        if (/D/.test(format.substring(0, format.indexOf('MMMM')))) { // if there is a day number before 'MMMM'
	            return this._monthsGenitiveEl[momentToFormat.month()];
	        } else {
	            return this._monthsNominativeEl[momentToFormat.month()];
	        }
	    },
	    monthsShort : 'Ιαν_Φεβ_Μαρ_Απρ_Μαϊ_Ιουν_Ιουλ_Αυγ_Σεπ_Οκτ_Νοε_Δεκ'.split('_'),
	    weekdays : 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
	    weekdaysShort : 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
	    weekdaysMin : 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'μμ' : 'ΜΜ';
	        } else {
	            return isLower ? 'πμ' : 'ΠΜ';
	        }
	    },
	    isPM : function (input) {
	        return ((input + '').toLowerCase()[0] === 'μ');
	    },
	    meridiemParse : /[ΠΜ]\.?Μ?\.?/i,
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendarEl : {
	        sameDay : '[Σήμερα {}] LT',
	        nextDay : '[Αύριο {}] LT',
	        nextWeek : 'dddd [{}] LT',
	        lastDay : '[Χθες {}] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 6:
	                    return '[το προηγούμενο] dddd [{}] LT';
	                default:
	                    return '[την προηγούμενη] dddd [{}] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    calendar : function (key, mom) {
	        var output = this._calendarEl[key],
	            hours = mom && mom.hours();
	        if (isFunction(output)) {
	            output = output.apply(mom);
	        }
	        return output.replace('{}', (hours % 12 === 1 ? 'στη' : 'στις'));
	    },
	    relativeTime : {
	        future : 'σε %s',
	        past : '%s πριν',
	        s : 'λίγα δευτερόλεπτα',
	        m : 'ένα λεπτό',
	        mm : '%d λεπτά',
	        h : 'μία ώρα',
	        hh : '%d ώρες',
	        d : 'μία μέρα',
	        dd : '%d μέρες',
	        M : 'ένας μήνας',
	        MM : '%d μήνες',
	        y : 'ένας χρόνος',
	        yy : '%d χρόνια'
	    },
	    ordinalParse: /\d{1,2}η/,
	    ordinal: '%dη',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4st is the first week of the year.
	    }
	});

	return el;

	})));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Australia) [en-au]
	//! author : Jared Morse : https://github.com/jarcoal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var enAu = moment.defineLocale('en-au', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return enAu;

	})));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Canada) [en-ca]
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var enCa = moment.defineLocale('en-ca', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'YYYY-MM-DD',
	        LL : 'MMMM D, YYYY',
	        LLL : 'MMMM D, YYYY h:mm A',
	        LLLL : 'dddd, MMMM D, YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    }
	});

	return enCa;

	})));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (United Kingdom) [en-gb]
	//! author : Chris Gedrim : https://github.com/chrisgedrim

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var enGb = moment.defineLocale('en-gb', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return enGb;

	})));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (Ireland) [en-ie]
	//! author : Chris Cartlidge : https://github.com/chriscartlidge

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var enIe = moment.defineLocale('en-ie', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return enIe;

	})));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : English (New Zealand) [en-nz]
	//! author : Luke McGregor : https://github.com/lukemcgregor

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var enNz = moment.defineLocale('en-nz', {
	    months : 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
	    weekdays : 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
	    weekdaysShort : 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
	    weekdaysMin : 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Today at] LT',
	        nextDay : '[Tomorrow at] LT',
	        nextWeek : 'dddd [at] LT',
	        lastDay : '[Yesterday at] LT',
	        lastWeek : '[Last] dddd [at] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'in %s',
	        past : '%s ago',
	        s : 'a few seconds',
	        m : 'a minute',
	        mm : '%d minutes',
	        h : 'an hour',
	        hh : '%d hours',
	        d : 'a day',
	        dd : '%d days',
	        M : 'a month',
	        MM : '%d months',
	        y : 'a year',
	        yy : '%d years'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return enNz;

	})));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Esperanto [eo]
	//! author : Colin Dean : https://github.com/colindean
	//! komento: Mi estas malcerta se mi korekte traktis akuzativojn en tiu traduko.
	//!          Se ne, bonvolu korekti kaj avizi min por ke mi povas lerni!

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var eo = moment.defineLocale('eo', {
	    months : 'januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec'.split('_'),
	    weekdays : 'Dimanĉo_Lundo_Mardo_Merkredo_Ĵaŭdo_Vendredo_Sabato'.split('_'),
	    weekdaysShort : 'Dim_Lun_Mard_Merk_Ĵaŭ_Ven_Sab'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Ĵa_Ve_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'D[-an de] MMMM, YYYY',
	        LLL : 'D[-an de] MMMM, YYYY HH:mm',
	        LLLL : 'dddd, [la] D[-an de] MMMM, YYYY HH:mm'
	    },
	    meridiemParse: /[ap]\.t\.m/i,
	    isPM: function (input) {
	        return input.charAt(0).toLowerCase() === 'p';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'p.t.m.' : 'P.T.M.';
	        } else {
	            return isLower ? 'a.t.m.' : 'A.T.M.';
	        }
	    },
	    calendar : {
	        sameDay : '[Hodiaŭ je] LT',
	        nextDay : '[Morgaŭ je] LT',
	        nextWeek : 'dddd [je] LT',
	        lastDay : '[Hieraŭ je] LT',
	        lastWeek : '[pasinta] dddd [je] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'je %s',
	        past : 'antaŭ %s',
	        s : 'sekundoj',
	        m : 'minuto',
	        mm : '%d minutoj',
	        h : 'horo',
	        hh : '%d horoj',
	        d : 'tago',//ne 'diurno', ĉar estas uzita por proksimumo
	        dd : '%d tagoj',
	        M : 'monato',
	        MM : '%d monatoj',
	        y : 'jaro',
	        yy : '%d jaroj'
	    },
	    ordinalParse: /\d{1,2}a/,
	    ordinal : '%da',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return eo;

	})));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Spanish (Dominican Republic) [es-do]

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
	var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	var esDo = moment.defineLocale('es-do', {
	    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShort[m.month()];
	        } else {
	            return monthsShortDot[m.month()];
	        }
	    },
	    monthsParseExact : true,
	    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY h:mm A',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextDay : function () {
	            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastDay : function () {
	            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastWeek : function () {
	            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'en %s',
	        past : 'hace %s',
	        s : 'unos segundos',
	        m : 'un minuto',
	        mm : '%d minutos',
	        h : 'una hora',
	        hh : '%d horas',
	        d : 'un día',
	        dd : '%d días',
	        M : 'un mes',
	        MM : '%d meses',
	        y : 'un año',
	        yy : '%d años'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return esDo;

	})));


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Spanish [es]
	//! author : Julio Napurí : https://github.com/julionc

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var monthsShortDot = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_');
	var monthsShort = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_');

	var es = moment.defineLocale('es', {
	    months : 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShort[m.month()];
	        } else {
	            return monthsShortDot[m.month()];
	        }
	    },
	    monthsParseExact : true,
	    weekdays : 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
	    weekdaysShort : 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
	    weekdaysMin : 'do_lu_ma_mi_ju_vi_sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY H:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextDay : function () {
	            return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastDay : function () {
	            return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        lastWeek : function () {
	            return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'en %s',
	        past : 'hace %s',
	        s : 'unos segundos',
	        m : 'un minuto',
	        mm : '%d minutos',
	        h : 'una hora',
	        hh : '%d horas',
	        d : 'un día',
	        dd : '%d días',
	        M : 'un mes',
	        MM : '%d meses',
	        y : 'un año',
	        yy : '%d años'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return es;

	})));


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Estonian [et]
	//! author : Henry Kehlmann : https://github.com/madhenry
	//! improvements : Illimar Tambek : https://github.com/ragulka

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        's' : ['mõne sekundi', 'mõni sekund', 'paar sekundit'],
	        'm' : ['ühe minuti', 'üks minut'],
	        'mm': [number + ' minuti', number + ' minutit'],
	        'h' : ['ühe tunni', 'tund aega', 'üks tund'],
	        'hh': [number + ' tunni', number + ' tundi'],
	        'd' : ['ühe päeva', 'üks päev'],
	        'M' : ['kuu aja', 'kuu aega', 'üks kuu'],
	        'MM': [number + ' kuu', number + ' kuud'],
	        'y' : ['ühe aasta', 'aasta', 'üks aasta'],
	        'yy': [number + ' aasta', number + ' aastat']
	    };
	    if (withoutSuffix) {
	        return format[key][2] ? format[key][2] : format[key][1];
	    }
	    return isFuture ? format[key][0] : format[key][1];
	}

	var et = moment.defineLocale('et', {
	    months        : 'jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember'.split('_'),
	    monthsShort   : 'jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets'.split('_'),
	    weekdays      : 'pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev'.split('_'),
	    weekdaysShort : 'P_E_T_K_N_R_L'.split('_'),
	    weekdaysMin   : 'P_E_T_K_N_R_L'.split('_'),
	    longDateFormat : {
	        LT   : 'H:mm',
	        LTS : 'H:mm:ss',
	        L    : 'DD.MM.YYYY',
	        LL   : 'D. MMMM YYYY',
	        LLL  : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[Täna,] LT',
	        nextDay  : '[Homme,] LT',
	        nextWeek : '[Järgmine] dddd LT',
	        lastDay  : '[Eile,] LT',
	        lastWeek : '[Eelmine] dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s pärast',
	        past   : '%s tagasi',
	        s      : processRelativeTime,
	        m      : processRelativeTime,
	        mm     : processRelativeTime,
	        h      : processRelativeTime,
	        hh     : processRelativeTime,
	        d      : processRelativeTime,
	        dd     : '%d päeva',
	        M      : processRelativeTime,
	        MM     : processRelativeTime,
	        y      : processRelativeTime,
	        yy     : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return et;

	})));


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Basque [eu]
	//! author : Eneko Illarramendi : https://github.com/eillarra

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var eu = moment.defineLocale('eu', {
	    months : 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
	    monthsShort : 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
	    weekdaysShort : 'ig._al._ar._az._og._ol._lr.'.split('_'),
	    weekdaysMin : 'ig_al_ar_az_og_ol_lr'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY[ko] MMMM[ren] D[a]',
	        LLL : 'YYYY[ko] MMMM[ren] D[a] HH:mm',
	        LLLL : 'dddd, YYYY[ko] MMMM[ren] D[a] HH:mm',
	        l : 'YYYY-M-D',
	        ll : 'YYYY[ko] MMM D[a]',
	        lll : 'YYYY[ko] MMM D[a] HH:mm',
	        llll : 'ddd, YYYY[ko] MMM D[a] HH:mm'
	    },
	    calendar : {
	        sameDay : '[gaur] LT[etan]',
	        nextDay : '[bihar] LT[etan]',
	        nextWeek : 'dddd LT[etan]',
	        lastDay : '[atzo] LT[etan]',
	        lastWeek : '[aurreko] dddd LT[etan]',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s barru',
	        past : 'duela %s',
	        s : 'segundo batzuk',
	        m : 'minutu bat',
	        mm : '%d minutu',
	        h : 'ordu bat',
	        hh : '%d ordu',
	        d : 'egun bat',
	        dd : '%d egun',
	        M : 'hilabete bat',
	        MM : '%d hilabete',
	        y : 'urte bat',
	        yy : '%d urte'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return eu;

	})));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Persian [fa]
	//! author : Ebrahim Byagowi : https://github.com/ebraminio

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '۱',
	    '2': '۲',
	    '3': '۳',
	    '4': '۴',
	    '5': '۵',
	    '6': '۶',
	    '7': '۷',
	    '8': '۸',
	    '9': '۹',
	    '0': '۰'
	};
	var numberMap = {
	    '۱': '1',
	    '۲': '2',
	    '۳': '3',
	    '۴': '4',
	    '۵': '5',
	    '۶': '6',
	    '۷': '7',
	    '۸': '8',
	    '۹': '9',
	    '۰': '0'
	};

	var fa = moment.defineLocale('fa', {
	    months : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	    monthsShort : 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'),
	    weekdays : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	    weekdaysShort : 'یک\u200cشنبه_دوشنبه_سه\u200cشنبه_چهارشنبه_پنج\u200cشنبه_جمعه_شنبه'.split('_'),
	    weekdaysMin : 'ی_د_س_چ_پ_ج_ش'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /قبل از ظهر|بعد از ظهر/,
	    isPM: function (input) {
	        return /بعد از ظهر/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'قبل از ظهر';
	        } else {
	            return 'بعد از ظهر';
	        }
	    },
	    calendar : {
	        sameDay : '[امروز ساعت] LT',
	        nextDay : '[فردا ساعت] LT',
	        nextWeek : 'dddd [ساعت] LT',
	        lastDay : '[دیروز ساعت] LT',
	        lastWeek : 'dddd [پیش] [ساعت] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'در %s',
	        past : '%s پیش',
	        s : 'چندین ثانیه',
	        m : 'یک دقیقه',
	        mm : '%d دقیقه',
	        h : 'یک ساعت',
	        hh : '%d ساعت',
	        d : 'یک روز',
	        dd : '%d روز',
	        M : 'یک ماه',
	        MM : '%d ماه',
	        y : 'یک سال',
	        yy : '%d سال'
	    },
	    preparse: function (string) {
	        return string.replace(/[۰-۹]/g, function (match) {
	            return numberMap[match];
	        }).replace(/،/g, ',');
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        }).replace(/,/g, '،');
	    },
	    ordinalParse: /\d{1,2}م/,
	    ordinal : '%dم',
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12 // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return fa;

	})));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Finnish [fi]
	//! author : Tarmo Aidantausta : https://github.com/bleadof

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var numbersPast = 'nolla yksi kaksi kolme neljä viisi kuusi seitsemän kahdeksan yhdeksän'.split(' ');
	var numbersFuture = [
	        'nolla', 'yhden', 'kahden', 'kolmen', 'neljän', 'viiden', 'kuuden',
	        numbersPast[7], numbersPast[8], numbersPast[9]
	    ];
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = '';
	    switch (key) {
	        case 's':
	            return isFuture ? 'muutaman sekunnin' : 'muutama sekunti';
	        case 'm':
	            return isFuture ? 'minuutin' : 'minuutti';
	        case 'mm':
	            result = isFuture ? 'minuutin' : 'minuuttia';
	            break;
	        case 'h':
	            return isFuture ? 'tunnin' : 'tunti';
	        case 'hh':
	            result = isFuture ? 'tunnin' : 'tuntia';
	            break;
	        case 'd':
	            return isFuture ? 'päivän' : 'päivä';
	        case 'dd':
	            result = isFuture ? 'päivän' : 'päivää';
	            break;
	        case 'M':
	            return isFuture ? 'kuukauden' : 'kuukausi';
	        case 'MM':
	            result = isFuture ? 'kuukauden' : 'kuukautta';
	            break;
	        case 'y':
	            return isFuture ? 'vuoden' : 'vuosi';
	        case 'yy':
	            result = isFuture ? 'vuoden' : 'vuotta';
	            break;
	    }
	    result = verbalNumber(number, isFuture) + ' ' + result;
	    return result;
	}
	function verbalNumber(number, isFuture) {
	    return number < 10 ? (isFuture ? numbersFuture[number] : numbersPast[number]) : number;
	}

	var fi = moment.defineLocale('fi', {
	    months : 'tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu'.split('_'),
	    monthsShort : 'tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu'.split('_'),
	    weekdays : 'sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai'.split('_'),
	    weekdaysShort : 'su_ma_ti_ke_to_pe_la'.split('_'),
	    weekdaysMin : 'su_ma_ti_ke_to_pe_la'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD.MM.YYYY',
	        LL : 'Do MMMM[ta] YYYY',
	        LLL : 'Do MMMM[ta] YYYY, [klo] HH.mm',
	        LLLL : 'dddd, Do MMMM[ta] YYYY, [klo] HH.mm',
	        l : 'D.M.YYYY',
	        ll : 'Do MMM YYYY',
	        lll : 'Do MMM YYYY, [klo] HH.mm',
	        llll : 'ddd, Do MMM YYYY, [klo] HH.mm'
	    },
	    calendar : {
	        sameDay : '[tänään] [klo] LT',
	        nextDay : '[huomenna] [klo] LT',
	        nextWeek : 'dddd [klo] LT',
	        lastDay : '[eilen] [klo] LT',
	        lastWeek : '[viime] dddd[na] [klo] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s päästä',
	        past : '%s sitten',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return fi;

	})));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Faroese [fo]
	//! author : Ragnar Johannesen : https://github.com/ragnar123

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var fo = moment.defineLocale('fo', {
	    months : 'januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	    weekdays : 'sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur'.split('_'),
	    weekdaysShort : 'sun_mán_týs_mik_hós_frí_ley'.split('_'),
	    weekdaysMin : 'su_má_tý_mi_hó_fr_le'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D. MMMM, YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Í dag kl.] LT',
	        nextDay : '[Í morgin kl.] LT',
	        nextWeek : 'dddd [kl.] LT',
	        lastDay : '[Í gjár kl.] LT',
	        lastWeek : '[síðstu] dddd [kl] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'um %s',
	        past : '%s síðani',
	        s : 'fá sekund',
	        m : 'ein minutt',
	        mm : '%d minuttir',
	        h : 'ein tími',
	        hh : '%d tímar',
	        d : 'ein dagur',
	        dd : '%d dagar',
	        M : 'ein mánaði',
	        MM : '%d mánaðir',
	        y : 'eitt ár',
	        yy : '%d ár'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return fo;

	})));


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French (Canada) [fr-ca]
	//! author : Jonathan Abourbih : https://github.com/jonbca

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var frCa = moment.defineLocale('fr-ca', {
	    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Aujourd\'hui à] LT',
	        nextDay: '[Demain à] LT',
	        nextWeek: 'dddd [à] LT',
	        lastDay: '[Hier à] LT',
	        lastWeek: 'dddd [dernier à] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dans %s',
	        past : 'il y a %s',
	        s : 'quelques secondes',
	        m : 'une minute',
	        mm : '%d minutes',
	        h : 'une heure',
	        hh : '%d heures',
	        d : 'un jour',
	        dd : '%d jours',
	        M : 'un mois',
	        MM : '%d mois',
	        y : 'un an',
	        yy : '%d ans'
	    },
	    ordinalParse: /\d{1,2}(er|e)/,
	    ordinal : function (number) {
	        return number + (number === 1 ? 'er' : 'e');
	    }
	});

	return frCa;

	})));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French (Switzerland) [fr-ch]
	//! author : Gaspard Bucher : https://github.com/gaspard

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var frCh = moment.defineLocale('fr-ch', {
	    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Aujourd\'hui à] LT',
	        nextDay: '[Demain à] LT',
	        nextWeek: 'dddd [à] LT',
	        lastDay: '[Hier à] LT',
	        lastWeek: 'dddd [dernier à] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dans %s',
	        past : 'il y a %s',
	        s : 'quelques secondes',
	        m : 'une minute',
	        mm : '%d minutes',
	        h : 'une heure',
	        hh : '%d heures',
	        d : 'un jour',
	        dd : '%d jours',
	        M : 'un mois',
	        MM : '%d mois',
	        y : 'un an',
	        yy : '%d ans'
	    },
	    ordinalParse: /\d{1,2}(er|e)/,
	    ordinal : function (number) {
	        return number + (number === 1 ? 'er' : 'e');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return frCh;

	})));


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : French [fr]
	//! author : John Fischer : https://github.com/jfroffice

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var fr = moment.defineLocale('fr', {
	    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
	    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
	    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
	    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Aujourd\'hui à] LT',
	        nextDay: '[Demain à] LT',
	        nextWeek: 'dddd [à] LT',
	        lastDay: '[Hier à] LT',
	        lastWeek: 'dddd [dernier à] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dans %s',
	        past : 'il y a %s',
	        s : 'quelques secondes',
	        m : 'une minute',
	        mm : '%d minutes',
	        h : 'une heure',
	        hh : '%d heures',
	        d : 'un jour',
	        dd : '%d jours',
	        M : 'un mois',
	        MM : '%d mois',
	        y : 'un an',
	        yy : '%d ans'
	    },
	    ordinalParse: /\d{1,2}(er|)/,
	    ordinal : function (number) {
	        return number + (number === 1 ? 'er' : '');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return fr;

	})));


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Frisian [fy]
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var monthsShortWithDots = 'jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.'.split('_');
	var monthsShortWithoutDots = 'jan_feb_mrt_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_');

	var fy = moment.defineLocale('fy', {
	    months : 'jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShortWithoutDots[m.month()];
	        } else {
	            return monthsShortWithDots[m.month()];
	        }
	    },
	    monthsParseExact : true,
	    weekdays : 'snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon'.split('_'),
	    weekdaysShort : 'si._mo._ti._wo._to._fr._so.'.split('_'),
	    weekdaysMin : 'Si_Mo_Ti_Wo_To_Fr_So'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[hjoed om] LT',
	        nextDay: '[moarn om] LT',
	        nextWeek: 'dddd [om] LT',
	        lastDay: '[juster om] LT',
	        lastWeek: '[ôfrûne] dddd [om] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'oer %s',
	        past : '%s lyn',
	        s : 'in pear sekonden',
	        m : 'ien minút',
	        mm : '%d minuten',
	        h : 'ien oere',
	        hh : '%d oeren',
	        d : 'ien dei',
	        dd : '%d dagen',
	        M : 'ien moanne',
	        MM : '%d moannen',
	        y : 'ien jier',
	        yy : '%d jierren'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return fy;

	})));


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Scottish Gaelic [gd]
	//! author : Jon Ashdown : https://github.com/jonashdown

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var months = [
	    'Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd'
	];

	var monthsShort = ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'];

	var weekdays = ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne'];

	var weekdaysShort = ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'];

	var weekdaysMin = ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'];

	var gd = moment.defineLocale('gd', {
	    months : months,
	    monthsShort : monthsShort,
	    monthsParseExact : true,
	    weekdays : weekdays,
	    weekdaysShort : weekdaysShort,
	    weekdaysMin : weekdaysMin,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[An-diugh aig] LT',
	        nextDay : '[A-màireach aig] LT',
	        nextWeek : 'dddd [aig] LT',
	        lastDay : '[An-dè aig] LT',
	        lastWeek : 'dddd [seo chaidh] [aig] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ann an %s',
	        past : 'bho chionn %s',
	        s : 'beagan diogan',
	        m : 'mionaid',
	        mm : '%d mionaidean',
	        h : 'uair',
	        hh : '%d uairean',
	        d : 'latha',
	        dd : '%d latha',
	        M : 'mìos',
	        MM : '%d mìosan',
	        y : 'bliadhna',
	        yy : '%d bliadhna'
	    },
	    ordinalParse : /\d{1,2}(d|na|mh)/,
	    ordinal : function (number) {
	        var output = number === 1 ? 'd' : number % 10 === 2 ? 'na' : 'mh';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return gd;

	})));


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Galician [gl]
	//! author : Juan G. Hurtado : https://github.com/juanghurtado

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var gl = moment.defineLocale('gl', {
	    months : 'xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro'.split('_'),
	    monthsShort : 'xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'domingo_luns_martes_mércores_xoves_venres_sábado'.split('_'),
	    weekdaysShort : 'dom._lun._mar._mér._xov._ven._sáb.'.split('_'),
	    weekdaysMin : 'do_lu_ma_mé_xo_ve_sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY H:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY H:mm'
	    },
	    calendar : {
	        sameDay : function () {
	            return '[hoxe ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	        },
	        nextDay : function () {
	            return '[mañá ' + ((this.hours() !== 1) ? 'ás' : 'á') + '] LT';
	        },
	        nextWeek : function () {
	            return 'dddd [' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	        },
	        lastDay : function () {
	            return '[onte ' + ((this.hours() !== 1) ? 'á' : 'a') + '] LT';
	        },
	        lastWeek : function () {
	            return '[o] dddd [pasado ' + ((this.hours() !== 1) ? 'ás' : 'a') + '] LT';
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : function (str) {
	            if (str.indexOf('un') === 0) {
	                return 'n' + str;
	            }
	            return 'en ' + str;
	        },
	        past : 'hai %s',
	        s : 'uns segundos',
	        m : 'un minuto',
	        mm : '%d minutos',
	        h : 'unha hora',
	        hh : '%d horas',
	        d : 'un día',
	        dd : '%d días',
	        M : 'un mes',
	        MM : '%d meses',
	        y : 'un ano',
	        yy : '%d anos'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return gl;

	})));


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hebrew [he]
	//! author : Tomer Cohen : https://github.com/tomer
	//! author : Moshe Simantov : https://github.com/DevelopmentIL
	//! author : Tal Ater : https://github.com/TalAter

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var he = moment.defineLocale('he', {
	    months : 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
	    monthsShort : 'ינו׳_פבר׳_מרץ_אפר׳_מאי_יוני_יולי_אוג׳_ספט׳_אוק׳_נוב׳_דצמ׳'.split('_'),
	    weekdays : 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
	    weekdaysShort : 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
	    weekdaysMin : 'א_ב_ג_ד_ה_ו_ש'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [ב]MMMM YYYY',
	        LLL : 'D [ב]MMMM YYYY HH:mm',
	        LLLL : 'dddd, D [ב]MMMM YYYY HH:mm',
	        l : 'D/M/YYYY',
	        ll : 'D MMM YYYY',
	        lll : 'D MMM YYYY HH:mm',
	        llll : 'ddd, D MMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[היום ב־]LT',
	        nextDay : '[מחר ב־]LT',
	        nextWeek : 'dddd [בשעה] LT',
	        lastDay : '[אתמול ב־]LT',
	        lastWeek : '[ביום] dddd [האחרון בשעה] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'בעוד %s',
	        past : 'לפני %s',
	        s : 'מספר שניות',
	        m : 'דקה',
	        mm : '%d דקות',
	        h : 'שעה',
	        hh : function (number) {
	            if (number === 2) {
	                return 'שעתיים';
	            }
	            return number + ' שעות';
	        },
	        d : 'יום',
	        dd : function (number) {
	            if (number === 2) {
	                return 'יומיים';
	            }
	            return number + ' ימים';
	        },
	        M : 'חודש',
	        MM : function (number) {
	            if (number === 2) {
	                return 'חודשיים';
	            }
	            return number + ' חודשים';
	        },
	        y : 'שנה',
	        yy : function (number) {
	            if (number === 2) {
	                return 'שנתיים';
	            } else if (number % 10 === 0 && number !== 10) {
	                return number + ' שנה';
	            }
	            return number + ' שנים';
	        }
	    },
	    meridiemParse: /אחה"צ|לפנה"צ|אחרי הצהריים|לפני הצהריים|לפנות בוקר|בבוקר|בערב/i,
	    isPM : function (input) {
	        return /^(אחה"צ|אחרי הצהריים|בערב)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 5) {
	            return 'לפנות בוקר';
	        } else if (hour < 10) {
	            return 'בבוקר';
	        } else if (hour < 12) {
	            return isLower ? 'לפנה"צ' : 'לפני הצהריים';
	        } else if (hour < 18) {
	            return isLower ? 'אחה"צ' : 'אחרי הצהריים';
	        } else {
	            return 'בערב';
	        }
	    }
	});

	return he;

	})));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hindi [hi]
	//! author : Mayank Singhal : https://github.com/mayanksinghal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '१',
	    '2': '२',
	    '3': '३',
	    '4': '४',
	    '5': '५',
	    '6': '६',
	    '7': '७',
	    '8': '८',
	    '9': '९',
	    '0': '०'
	};
	var numberMap = {
	    '१': '1',
	    '२': '2',
	    '३': '3',
	    '४': '4',
	    '५': '5',
	    '६': '6',
	    '७': '7',
	    '८': '8',
	    '९': '9',
	    '०': '0'
	};

	var hi = moment.defineLocale('hi', {
	    months : 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
	    monthsShort : 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	    weekdaysShort : 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
	    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm बजे',
	        LTS : 'A h:mm:ss बजे',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm बजे',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm बजे'
	    },
	    calendar : {
	        sameDay : '[आज] LT',
	        nextDay : '[कल] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[कल] LT',
	        lastWeek : '[पिछले] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s में',
	        past : '%s पहले',
	        s : 'कुछ ही क्षण',
	        m : 'एक मिनट',
	        mm : '%d मिनट',
	        h : 'एक घंटा',
	        hh : '%d घंटे',
	        d : 'एक दिन',
	        dd : '%d दिन',
	        M : 'एक महीने',
	        MM : '%d महीने',
	        y : 'एक वर्ष',
	        yy : '%d वर्ष'
	    },
	    preparse: function (string) {
	        return string.replace(/[१२३४५६७८९०]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    // Hindi notation for meridiems are quite fuzzy in practice. While there exists
	    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Hindi.
	    meridiemParse: /रात|सुबह|दोपहर|शाम/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'रात') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'सुबह') {
	            return hour;
	        } else if (meridiem === 'दोपहर') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'शाम') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'रात';
	        } else if (hour < 10) {
	            return 'सुबह';
	        } else if (hour < 17) {
	            return 'दोपहर';
	        } else if (hour < 20) {
	            return 'शाम';
	        } else {
	            return 'रात';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return hi;

	})));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Croatian [hr]
	//! author : Bojan Marković : https://github.com/bmarkovic

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function translate(number, withoutSuffix, key) {
	    var result = number + ' ';
	    switch (key) {
	        case 'm':
	            return withoutSuffix ? 'jedna minuta' : 'jedne minute';
	        case 'mm':
	            if (number === 1) {
	                result += 'minuta';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'minute';
	            } else {
	                result += 'minuta';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'jedan sat' : 'jednog sata';
	        case 'hh':
	            if (number === 1) {
	                result += 'sat';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'sata';
	            } else {
	                result += 'sati';
	            }
	            return result;
	        case 'dd':
	            if (number === 1) {
	                result += 'dan';
	            } else {
	                result += 'dana';
	            }
	            return result;
	        case 'MM':
	            if (number === 1) {
	                result += 'mjesec';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'mjeseca';
	            } else {
	                result += 'mjeseci';
	            }
	            return result;
	        case 'yy':
	            if (number === 1) {
	                result += 'godina';
	            } else if (number === 2 || number === 3 || number === 4) {
	                result += 'godine';
	            } else {
	                result += 'godina';
	            }
	            return result;
	    }
	}

	var hr = moment.defineLocale('hr', {
	    months : {
	        format: 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_'),
	        standalone: 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_')
	    },
	    monthsShort : 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort : 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	    weekdaysMin : 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[danas u] LT',
	        nextDay  : '[sutra u] LT',
	        nextWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[jučer u] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                    return '[prošlu] dddd [u] LT';
	                case 6:
	                    return '[prošle] [subote] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prošli] dddd [u] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'prije %s',
	        s      : 'par sekundi',
	        m      : translate,
	        mm     : translate,
	        h      : translate,
	        hh     : translate,
	        d      : 'dan',
	        dd     : translate,
	        M      : 'mjesec',
	        MM     : translate,
	        y      : 'godinu',
	        yy     : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return hr;

	})));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Hungarian [hu]
	//! author : Adam Brunner : https://github.com/adambrunner

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var weekEndings = 'vasárnap hétfőn kedden szerdán csütörtökön pénteken szombaton'.split(' ');
	function translate(number, withoutSuffix, key, isFuture) {
	    var num = number,
	        suffix;
	    switch (key) {
	        case 's':
	            return (isFuture || withoutSuffix) ? 'néhány másodperc' : 'néhány másodperce';
	        case 'm':
	            return 'egy' + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'mm':
	            return num + (isFuture || withoutSuffix ? ' perc' : ' perce');
	        case 'h':
	            return 'egy' + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'hh':
	            return num + (isFuture || withoutSuffix ? ' óra' : ' órája');
	        case 'd':
	            return 'egy' + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'dd':
	            return num + (isFuture || withoutSuffix ? ' nap' : ' napja');
	        case 'M':
	            return 'egy' + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'MM':
	            return num + (isFuture || withoutSuffix ? ' hónap' : ' hónapja');
	        case 'y':
	            return 'egy' + (isFuture || withoutSuffix ? ' év' : ' éve');
	        case 'yy':
	            return num + (isFuture || withoutSuffix ? ' év' : ' éve');
	    }
	    return '';
	}
	function week(isFuture) {
	    return (isFuture ? '' : '[múlt] ') + '[' + weekEndings[this.day()] + '] LT[-kor]';
	}

	var hu = moment.defineLocale('hu', {
	    months : 'január_február_március_április_május_június_július_augusztus_szeptember_október_november_december'.split('_'),
	    monthsShort : 'jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec'.split('_'),
	    weekdays : 'vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat'.split('_'),
	    weekdaysShort : 'vas_hét_kedd_sze_csüt_pén_szo'.split('_'),
	    weekdaysMin : 'v_h_k_sze_cs_p_szo'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'YYYY.MM.DD.',
	        LL : 'YYYY. MMMM D.',
	        LLL : 'YYYY. MMMM D. H:mm',
	        LLLL : 'YYYY. MMMM D., dddd H:mm'
	    },
	    meridiemParse: /de|du/i,
	    isPM: function (input) {
	        return input.charAt(1).toLowerCase() === 'u';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 12) {
	            return isLower === true ? 'de' : 'DE';
	        } else {
	            return isLower === true ? 'du' : 'DU';
	        }
	    },
	    calendar : {
	        sameDay : '[ma] LT[-kor]',
	        nextDay : '[holnap] LT[-kor]',
	        nextWeek : function () {
	            return week.call(this, true);
	        },
	        lastDay : '[tegnap] LT[-kor]',
	        lastWeek : function () {
	            return week.call(this, false);
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s múlva',
	        past : '%s',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return hu;

	})));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Armenian [hy-am]
	//! author : Armendarabyan : https://github.com/armendarabyan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var hyAm = moment.defineLocale('hy-am', {
	    months : {
	        format: 'հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի'.split('_'),
	        standalone: 'հունվար_փետրվար_մարտ_ապրիլ_մայիս_հունիս_հուլիս_օգոստոս_սեպտեմբեր_հոկտեմբեր_նոյեմբեր_դեկտեմբեր'.split('_')
	    },
	    monthsShort : 'հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ'.split('_'),
	    weekdays : 'կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ'.split('_'),
	    weekdaysShort : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	    weekdaysMin : 'կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY թ.',
	        LLL : 'D MMMM YYYY թ., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY թ., HH:mm'
	    },
	    calendar : {
	        sameDay: '[այսօր] LT',
	        nextDay: '[վաղը] LT',
	        lastDay: '[երեկ] LT',
	        nextWeek: function () {
	            return 'dddd [օրը ժամը] LT';
	        },
	        lastWeek: function () {
	            return '[անցած] dddd [օրը ժամը] LT';
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : '%s հետո',
	        past : '%s առաջ',
	        s : 'մի քանի վայրկյան',
	        m : 'րոպե',
	        mm : '%d րոպե',
	        h : 'ժամ',
	        hh : '%d ժամ',
	        d : 'օր',
	        dd : '%d օր',
	        M : 'ամիս',
	        MM : '%d ամիս',
	        y : 'տարի',
	        yy : '%d տարի'
	    },
	    meridiemParse: /գիշերվա|առավոտվա|ցերեկվա|երեկոյան/,
	    isPM: function (input) {
	        return /^(ցերեկվա|երեկոյան)$/.test(input);
	    },
	    meridiem : function (hour) {
	        if (hour < 4) {
	            return 'գիշերվա';
	        } else if (hour < 12) {
	            return 'առավոտվա';
	        } else if (hour < 17) {
	            return 'ցերեկվա';
	        } else {
	            return 'երեկոյան';
	        }
	    },
	    ordinalParse: /\d{1,2}|\d{1,2}-(ին|րդ)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'DDD':
	            case 'w':
	            case 'W':
	            case 'DDDo':
	                if (number === 1) {
	                    return number + '-ին';
	                }
	                return number + '-րդ';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return hyAm;

	})));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Indonesian [id]
	//! author : Mohammad Satrio Utomo : https://github.com/tyok
	//! reference: http://id.wikisource.org/wiki/Pedoman_Umum_Ejaan_Bahasa_Indonesia_yang_Disempurnakan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var id = moment.defineLocale('id', {
	    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nov_Des'.split('_'),
	    weekdays : 'Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu'.split('_'),
	    weekdaysShort : 'Min_Sen_Sel_Rab_Kam_Jum_Sab'.split('_'),
	    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sb'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /pagi|siang|sore|malam/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'pagi') {
	            return hour;
	        } else if (meridiem === 'siang') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'sore' || meridiem === 'malam') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'pagi';
	        } else if (hours < 15) {
	            return 'siang';
	        } else if (hours < 19) {
	            return 'sore';
	        } else {
	            return 'malam';
	        }
	    },
	    calendar : {
	        sameDay : '[Hari ini pukul] LT',
	        nextDay : '[Besok pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kemarin pukul] LT',
	        lastWeek : 'dddd [lalu pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'dalam %s',
	        past : '%s yang lalu',
	        s : 'beberapa detik',
	        m : 'semenit',
	        mm : '%d menit',
	        h : 'sejam',
	        hh : '%d jam',
	        d : 'sehari',
	        dd : '%d hari',
	        M : 'sebulan',
	        MM : '%d bulan',
	        y : 'setahun',
	        yy : '%d tahun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return id;

	})));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Icelandic [is]
	//! author : Hinrik Örn Sigurðsson : https://github.com/hinrik

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function plural(n) {
	    if (n % 100 === 11) {
	        return true;
	    } else if (n % 10 === 1) {
	        return false;
	    }
	    return true;
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nokkrar sekúndur' : 'nokkrum sekúndum';
	        case 'm':
	            return withoutSuffix ? 'mínúta' : 'mínútu';
	        case 'mm':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'mínútur' : 'mínútum');
	            } else if (withoutSuffix) {
	                return result + 'mínúta';
	            }
	            return result + 'mínútu';
	        case 'hh':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'klukkustundir' : 'klukkustundum');
	            }
	            return result + 'klukkustund';
	        case 'd':
	            if (withoutSuffix) {
	                return 'dagur';
	            }
	            return isFuture ? 'dag' : 'degi';
	        case 'dd':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'dagar';
	                }
	                return result + (isFuture ? 'daga' : 'dögum');
	            } else if (withoutSuffix) {
	                return result + 'dagur';
	            }
	            return result + (isFuture ? 'dag' : 'degi');
	        case 'M':
	            if (withoutSuffix) {
	                return 'mánuður';
	            }
	            return isFuture ? 'mánuð' : 'mánuði';
	        case 'MM':
	            if (plural(number)) {
	                if (withoutSuffix) {
	                    return result + 'mánuðir';
	                }
	                return result + (isFuture ? 'mánuði' : 'mánuðum');
	            } else if (withoutSuffix) {
	                return result + 'mánuður';
	            }
	            return result + (isFuture ? 'mánuð' : 'mánuði');
	        case 'y':
	            return withoutSuffix || isFuture ? 'ár' : 'ári';
	        case 'yy':
	            if (plural(number)) {
	                return result + (withoutSuffix || isFuture ? 'ár' : 'árum');
	            }
	            return result + (withoutSuffix || isFuture ? 'ár' : 'ári');
	    }
	}

	var is = moment.defineLocale('is', {
	    months : 'janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des'.split('_'),
	    weekdays : 'sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur'.split('_'),
	    weekdaysShort : 'sun_mán_þri_mið_fim_fös_lau'.split('_'),
	    weekdaysMin : 'Su_Má_Þr_Mi_Fi_Fö_La'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY [kl.] H:mm',
	        LLLL : 'dddd, D. MMMM YYYY [kl.] H:mm'
	    },
	    calendar : {
	        sameDay : '[í dag kl.] LT',
	        nextDay : '[á morgun kl.] LT',
	        nextWeek : 'dddd [kl.] LT',
	        lastDay : '[í gær kl.] LT',
	        lastWeek : '[síðasta] dddd [kl.] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'eftir %s',
	        past : 'fyrir %s síðan',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : 'klukkustund',
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return is;

	})));


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Italian [it]
	//! author : Lorenzo : https://github.com/aliem
	//! author: Mattia Larentis: https://github.com/nostalgiaz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var it = moment.defineLocale('it', {
	    months : 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
	    monthsShort : 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
	    weekdays : 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Venerdì_Sabato'.split('_'),
	    weekdaysShort : 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
	    weekdaysMin : 'Do_Lu_Ma_Me_Gi_Ve_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Oggi alle] LT',
	        nextDay: '[Domani alle] LT',
	        nextWeek: 'dddd [alle] LT',
	        lastDay: '[Ieri alle] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[la scorsa] dddd [alle] LT';
	                default:
	                    return '[lo scorso] dddd [alle] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : function (s) {
	            return ((/^[0-9].+$/).test(s) ? 'tra' : 'in') + ' ' + s;
	        },
	        past : '%s fa',
	        s : 'alcuni secondi',
	        m : 'un minuto',
	        mm : '%d minuti',
	        h : 'un\'ora',
	        hh : '%d ore',
	        d : 'un giorno',
	        dd : '%d giorni',
	        M : 'un mese',
	        MM : '%d mesi',
	        y : 'un anno',
	        yy : '%d anni'
	    },
	    ordinalParse : /\d{1,2}º/,
	    ordinal: '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return it;

	})));


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Japanese [ja]
	//! author : LI Long : https://github.com/baryon

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ja = moment.defineLocale('ja', {
	    months : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
	    weekdaysShort : '日_月_火_水_木_金_土'.split('_'),
	    weekdaysMin : '日_月_火_水_木_金_土'.split('_'),
	    longDateFormat : {
	        LT : 'Ah時m分',
	        LTS : 'Ah時m分s秒',
	        L : 'YYYY/MM/DD',
	        LL : 'YYYY年M月D日',
	        LLL : 'YYYY年M月D日Ah時m分',
	        LLLL : 'YYYY年M月D日Ah時m分 dddd'
	    },
	    meridiemParse: /午前|午後/i,
	    isPM : function (input) {
	        return input === '午後';
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return '午前';
	        } else {
	            return '午後';
	        }
	    },
	    calendar : {
	        sameDay : '[今日] LT',
	        nextDay : '[明日] LT',
	        nextWeek : '[来週]dddd LT',
	        lastDay : '[昨日] LT',
	        lastWeek : '[前週]dddd LT',
	        sameElse : 'L'
	    },
	    ordinalParse : /\d{1,2}日/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            default:
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s後',
	        past : '%s前',
	        s : '数秒',
	        m : '1分',
	        mm : '%d分',
	        h : '1時間',
	        hh : '%d時間',
	        d : '1日',
	        dd : '%d日',
	        M : '1ヶ月',
	        MM : '%dヶ月',
	        y : '1年',
	        yy : '%d年'
	    }
	});

	return ja;

	})));


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Javanese [jv]
	//! author : Rony Lantip : https://github.com/lantip
	//! reference: http://jv.wikipedia.org/wiki/Basa_Jawa

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var jv = moment.defineLocale('jv', {
	    months : 'Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember'.split('_'),
	    monthsShort : 'Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des'.split('_'),
	    weekdays : 'Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu'.split('_'),
	    weekdaysShort : 'Min_Sen_Sel_Reb_Kem_Jem_Sep'.split('_'),
	    weekdaysMin : 'Mg_Sn_Sl_Rb_Km_Jm_Sp'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /enjing|siyang|sonten|ndalu/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'enjing') {
	            return hour;
	        } else if (meridiem === 'siyang') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'sonten' || meridiem === 'ndalu') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'enjing';
	        } else if (hours < 15) {
	            return 'siyang';
	        } else if (hours < 19) {
	            return 'sonten';
	        } else {
	            return 'ndalu';
	        }
	    },
	    calendar : {
	        sameDay : '[Dinten puniko pukul] LT',
	        nextDay : '[Mbenjang pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kala wingi pukul] LT',
	        lastWeek : 'dddd [kepengker pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'wonten ing %s',
	        past : '%s ingkang kepengker',
	        s : 'sawetawis detik',
	        m : 'setunggal menit',
	        mm : '%d menit',
	        h : 'setunggal jam',
	        hh : '%d jam',
	        d : 'sedinten',
	        dd : '%d dinten',
	        M : 'sewulan',
	        MM : '%d wulan',
	        y : 'setaun',
	        yy : '%d taun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return jv;

	})));


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Georgian [ka]
	//! author : Irakli Janiashvili : https://github.com/irakli-janiashvili

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ka = moment.defineLocale('ka', {
	    months : {
	        standalone: 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
	        format: 'იანვარს_თებერვალს_მარტს_აპრილის_მაისს_ივნისს_ივლისს_აგვისტს_სექტემბერს_ოქტომბერს_ნოემბერს_დეკემბერს'.split('_')
	    },
	    monthsShort : 'იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ'.split('_'),
	    weekdays : {
	        standalone: 'კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი'.split('_'),
	        format: 'კვირას_ორშაბათს_სამშაბათს_ოთხშაბათს_ხუთშაბათს_პარასკევს_შაბათს'.split('_'),
	        isFormat: /(წინა|შემდეგ)/
	    },
	    weekdaysShort : 'კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ'.split('_'),
	    weekdaysMin : 'კვ_ორ_სა_ოთ_ხუ_პა_შა'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[დღეს] LT[-ზე]',
	        nextDay : '[ხვალ] LT[-ზე]',
	        lastDay : '[გუშინ] LT[-ზე]',
	        nextWeek : '[შემდეგ] dddd LT[-ზე]',
	        lastWeek : '[წინა] dddd LT-ზე',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : function (s) {
	            return (/(წამი|წუთი|საათი|წელი)/).test(s) ?
	                s.replace(/ი$/, 'ში') :
	                s + 'ში';
	        },
	        past : function (s) {
	            if ((/(წამი|წუთი|საათი|დღე|თვე)/).test(s)) {
	                return s.replace(/(ი|ე)$/, 'ის წინ');
	            }
	            if ((/წელი/).test(s)) {
	                return s.replace(/წელი$/, 'წლის წინ');
	            }
	        },
	        s : 'რამდენიმე წამი',
	        m : 'წუთი',
	        mm : '%d წუთი',
	        h : 'საათი',
	        hh : '%d საათი',
	        d : 'დღე',
	        dd : '%d დღე',
	        M : 'თვე',
	        MM : '%d თვე',
	        y : 'წელი',
	        yy : '%d წელი'
	    },
	    ordinalParse: /0|1-ლი|მე-\d{1,2}|\d{1,2}-ე/,
	    ordinal : function (number) {
	        if (number === 0) {
	            return number;
	        }
	        if (number === 1) {
	            return number + '-ლი';
	        }
	        if ((number < 20) || (number <= 100 && (number % 20 === 0)) || (number % 100 === 0)) {
	            return 'მე-' + number;
	        }
	        return number + '-ე';
	    },
	    week : {
	        dow : 1,
	        doy : 7
	    }
	});

	return ka;

	})));


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Kazakh [kk]
	//! authors : Nurlan Rakhimzhanov : https://github.com/nurlan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var suffixes = {
	    0: '-ші',
	    1: '-ші',
	    2: '-ші',
	    3: '-ші',
	    4: '-ші',
	    5: '-ші',
	    6: '-шы',
	    7: '-ші',
	    8: '-ші',
	    9: '-шы',
	    10: '-шы',
	    20: '-шы',
	    30: '-шы',
	    40: '-шы',
	    50: '-ші',
	    60: '-шы',
	    70: '-ші',
	    80: '-ші',
	    90: '-шы',
	    100: '-ші'
	};

	var kk = moment.defineLocale('kk', {
	    months : 'қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан'.split('_'),
	    monthsShort : 'қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел'.split('_'),
	    weekdays : 'жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі'.split('_'),
	    weekdaysShort : 'жек_дүй_сей_сәр_бей_жұм_сен'.split('_'),
	    weekdaysMin : 'жк_дй_сй_ср_бй_жм_сн'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Бүгін сағат] LT',
	        nextDay : '[Ертең сағат] LT',
	        nextWeek : 'dddd [сағат] LT',
	        lastDay : '[Кеше сағат] LT',
	        lastWeek : '[Өткен аптаның] dddd [сағат] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ішінде',
	        past : '%s бұрын',
	        s : 'бірнеше секунд',
	        m : 'бір минут',
	        mm : '%d минут',
	        h : 'бір сағат',
	        hh : '%d сағат',
	        d : 'бір күн',
	        dd : '%d күн',
	        M : 'бір ай',
	        MM : '%d ай',
	        y : 'бір жыл',
	        yy : '%d жыл'
	    },
	    ordinalParse: /\d{1,2}-(ші|шы)/,
	    ordinal : function (number) {
	        var a = number % 10,
	            b = number >= 100 ? 100 : null;
	        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return kk;

	})));


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Cambodian [km]
	//! author : Kruy Vanna : https://github.com/kruyvanna

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var km = moment.defineLocale('km', {
	    months: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	    monthsShort: 'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split('_'),
	    weekdays: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	    weekdaysShort: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	    weekdaysMin: 'អាទិត្យ_ច័ន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍'.split('_'),
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[ថ្ងៃនេះ ម៉ោង] LT',
	        nextDay: '[ស្អែក ម៉ោង] LT',
	        nextWeek: 'dddd [ម៉ោង] LT',
	        lastDay: '[ម្សិលមិញ ម៉ោង] LT',
	        lastWeek: 'dddd [សប្តាហ៍មុន] [ម៉ោង] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: '%sទៀត',
	        past: '%sមុន',
	        s: 'ប៉ុន្មានវិនាទី',
	        m: 'មួយនាទី',
	        mm: '%d នាទី',
	        h: 'មួយម៉ោង',
	        hh: '%d ម៉ោង',
	        d: 'មួយថ្ងៃ',
	        dd: '%d ថ្ងៃ',
	        M: 'មួយខែ',
	        MM: '%d ខែ',
	        y: 'មួយឆ្នាំ',
	        yy: '%d ឆ្នាំ'
	    },
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4 // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return km;

	})));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Korean [ko]
	//! author : Kyungwook, Park : https://github.com/kyungw00k
	//! author : Jeeeyul Lee <jeeeyul@gmail.com>

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ko = moment.defineLocale('ko', {
	    months : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	    monthsShort : '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
	    weekdays : '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
	    weekdaysShort : '일_월_화_수_목_금_토'.split('_'),
	    weekdaysMin : '일_월_화_수_목_금_토'.split('_'),
	    longDateFormat : {
	        LT : 'A h시 m분',
	        LTS : 'A h시 m분 s초',
	        L : 'YYYY.MM.DD',
	        LL : 'YYYY년 MMMM D일',
	        LLL : 'YYYY년 MMMM D일 A h시 m분',
	        LLLL : 'YYYY년 MMMM D일 dddd A h시 m분'
	    },
	    calendar : {
	        sameDay : '오늘 LT',
	        nextDay : '내일 LT',
	        nextWeek : 'dddd LT',
	        lastDay : '어제 LT',
	        lastWeek : '지난주 dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s 후',
	        past : '%s 전',
	        s : '몇 초',
	        ss : '%d초',
	        m : '일분',
	        mm : '%d분',
	        h : '한 시간',
	        hh : '%d시간',
	        d : '하루',
	        dd : '%d일',
	        M : '한 달',
	        MM : '%d달',
	        y : '일 년',
	        yy : '%d년'
	    },
	    ordinalParse : /\d{1,2}일/,
	    ordinal : '%d일',
	    meridiemParse : /오전|오후/,
	    isPM : function (token) {
	        return token === '오후';
	    },
	    meridiem : function (hour, minute, isUpper) {
	        return hour < 12 ? '오전' : '오후';
	    }
	});

	return ko;

	})));


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Kyrgyz [ky]
	//! author : Chyngyz Arystan uulu : https://github.com/chyngyz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';



	var suffixes = {
	    0: '-чү',
	    1: '-чи',
	    2: '-чи',
	    3: '-чү',
	    4: '-чү',
	    5: '-чи',
	    6: '-чы',
	    7: '-чи',
	    8: '-чи',
	    9: '-чу',
	    10: '-чу',
	    20: '-чы',
	    30: '-чу',
	    40: '-чы',
	    50: '-чү',
	    60: '-чы',
	    70: '-чи',
	    80: '-чи',
	    90: '-чу',
	    100: '-чү'
	};

	var ky = moment.defineLocale('ky', {
	    months : 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'),
	    monthsShort : 'янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек'.split('_'),
	    weekdays : 'Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби'.split('_'),
	    weekdaysShort : 'Жек_Дүй_Шей_Шар_Бей_Жум_Ише'.split('_'),
	    weekdaysMin : 'Жк_Дй_Шй_Шр_Бй_Жм_Иш'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Бүгүн саат] LT',
	        nextDay : '[Эртең саат] LT',
	        nextWeek : 'dddd [саат] LT',
	        lastDay : '[Кече саат] LT',
	        lastWeek : '[Өткен аптанын] dddd [күнү] [саат] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ичинде',
	        past : '%s мурун',
	        s : 'бирнече секунд',
	        m : 'бир мүнөт',
	        mm : '%d мүнөт',
	        h : 'бир саат',
	        hh : '%d саат',
	        d : 'бир күн',
	        dd : '%d күн',
	        M : 'бир ай',
	        MM : '%d ай',
	        y : 'бир жыл',
	        yy : '%d жыл'
	    },
	    ordinalParse: /\d{1,2}-(чи|чы|чү|чу)/,
	    ordinal : function (number) {
	        var a = number % 10,
	            b = number >= 100 ? 100 : null;
	        return number + (suffixes[number] || suffixes[a] || suffixes[b]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ky;

	})));


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Luxembourgish [lb]
	//! author : mweimerskirch : https://github.com/mweimerskirch
	//! author : David Raison : https://github.com/kwisatz

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        'm': ['eng Minutt', 'enger Minutt'],
	        'h': ['eng Stonn', 'enger Stonn'],
	        'd': ['een Dag', 'engem Dag'],
	        'M': ['ee Mount', 'engem Mount'],
	        'y': ['ee Joer', 'engem Joer']
	    };
	    return withoutSuffix ? format[key][0] : format[key][1];
	}
	function processFutureTime(string) {
	    var number = string.substr(0, string.indexOf(' '));
	    if (eifelerRegelAppliesToNumber(number)) {
	        return 'a ' + string;
	    }
	    return 'an ' + string;
	}
	function processPastTime(string) {
	    var number = string.substr(0, string.indexOf(' '));
	    if (eifelerRegelAppliesToNumber(number)) {
	        return 'viru ' + string;
	    }
	    return 'virun ' + string;
	}
	/**
	 * Returns true if the word before the given number loses the '-n' ending.
	 * e.g. 'an 10 Deeg' but 'a 5 Deeg'
	 *
	 * @param number {integer}
	 * @returns {boolean}
	 */
	function eifelerRegelAppliesToNumber(number) {
	    number = parseInt(number, 10);
	    if (isNaN(number)) {
	        return false;
	    }
	    if (number < 0) {
	        // Negative Number --> always true
	        return true;
	    } else if (number < 10) {
	        // Only 1 digit
	        if (4 <= number && number <= 7) {
	            return true;
	        }
	        return false;
	    } else if (number < 100) {
	        // 2 digits
	        var lastDigit = number % 10, firstDigit = number / 10;
	        if (lastDigit === 0) {
	            return eifelerRegelAppliesToNumber(firstDigit);
	        }
	        return eifelerRegelAppliesToNumber(lastDigit);
	    } else if (number < 10000) {
	        // 3 or 4 digits --> recursively check first digit
	        while (number >= 10) {
	            number = number / 10;
	        }
	        return eifelerRegelAppliesToNumber(number);
	    } else {
	        // Anything larger than 4 digits: recursively check first n-3 digits
	        number = number / 1000;
	        return eifelerRegelAppliesToNumber(number);
	    }
	}

	var lb = moment.defineLocale('lb', {
	    months: 'Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
	    monthsShort: 'Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.'.split('_'),
	    monthsParseExact : true,
	    weekdays: 'Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg'.split('_'),
	    weekdaysShort: 'So._Mé._Dë._Më._Do._Fr._Sa.'.split('_'),
	    weekdaysMin: 'So_Mé_Dë_Më_Do_Fr_Sa'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm [Auer]',
	        LTS: 'H:mm:ss [Auer]',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm [Auer]',
	        LLLL: 'dddd, D. MMMM YYYY H:mm [Auer]'
	    },
	    calendar: {
	        sameDay: '[Haut um] LT',
	        sameElse: 'L',
	        nextDay: '[Muer um] LT',
	        nextWeek: 'dddd [um] LT',
	        lastDay: '[Gëschter um] LT',
	        lastWeek: function () {
	            // Different date string for 'Dënschdeg' (Tuesday) and 'Donneschdeg' (Thursday) due to phonological rule
	            switch (this.day()) {
	                case 2:
	                case 4:
	                    return '[Leschten] dddd [um] LT';
	                default:
	                    return '[Leschte] dddd [um] LT';
	            }
	        }
	    },
	    relativeTime : {
	        future : processFutureTime,
	        past : processPastTime,
	        s : 'e puer Sekonnen',
	        m : processRelativeTime,
	        mm : '%d Minutten',
	        h : processRelativeTime,
	        hh : '%d Stonnen',
	        d : processRelativeTime,
	        dd : '%d Deeg',
	        M : processRelativeTime,
	        MM : '%d Méint',
	        y : processRelativeTime,
	        yy : '%d Joer'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal: '%d.',
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return lb;

	})));


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lao [lo]
	//! author : Ryan Hart : https://github.com/ryanhart2

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var lo = moment.defineLocale('lo', {
	    months : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	    monthsShort : 'ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ'.split('_'),
	    weekdays : 'ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	    weekdaysShort : 'ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ'.split('_'),
	    weekdaysMin : 'ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'ວັນdddd D MMMM YYYY HH:mm'
	    },
	    meridiemParse: /ຕອນເຊົ້າ|ຕອນແລງ/,
	    isPM: function (input) {
	        return input === 'ຕອນແລງ';
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ຕອນເຊົ້າ';
	        } else {
	            return 'ຕອນແລງ';
	        }
	    },
	    calendar : {
	        sameDay : '[ມື້ນີ້ເວລາ] LT',
	        nextDay : '[ມື້ອື່ນເວລາ] LT',
	        nextWeek : '[ວັນ]dddd[ໜ້າເວລາ] LT',
	        lastDay : '[ມື້ວານນີ້ເວລາ] LT',
	        lastWeek : '[ວັນ]dddd[ແລ້ວນີ້ເວລາ] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ອີກ %s',
	        past : '%sຜ່ານມາ',
	        s : 'ບໍ່ເທົ່າໃດວິນາທີ',
	        m : '1 ນາທີ',
	        mm : '%d ນາທີ',
	        h : '1 ຊົ່ວໂມງ',
	        hh : '%d ຊົ່ວໂມງ',
	        d : '1 ມື້',
	        dd : '%d ມື້',
	        M : '1 ເດືອນ',
	        MM : '%d ເດືອນ',
	        y : '1 ປີ',
	        yy : '%d ປີ'
	    },
	    ordinalParse: /(ທີ່)\d{1,2}/,
	    ordinal : function (number) {
	        return 'ທີ່' + number;
	    }
	});

	return lo;

	})));


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Lithuanian [lt]
	//! author : Mindaugas Mozūras : https://github.com/mmozuras

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var units = {
	    'm' : 'minutė_minutės_minutę',
	    'mm': 'minutės_minučių_minutes',
	    'h' : 'valanda_valandos_valandą',
	    'hh': 'valandos_valandų_valandas',
	    'd' : 'diena_dienos_dieną',
	    'dd': 'dienos_dienų_dienas',
	    'M' : 'mėnuo_mėnesio_mėnesį',
	    'MM': 'mėnesiai_mėnesių_mėnesius',
	    'y' : 'metai_metų_metus',
	    'yy': 'metai_metų_metus'
	};
	function translateSeconds(number, withoutSuffix, key, isFuture) {
	    if (withoutSuffix) {
	        return 'kelios sekundės';
	    } else {
	        return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
	    }
	}
	function translateSingular(number, withoutSuffix, key, isFuture) {
	    return withoutSuffix ? forms(key)[0] : (isFuture ? forms(key)[1] : forms(key)[2]);
	}
	function special(number) {
	    return number % 10 === 0 || (number > 10 && number < 20);
	}
	function forms(key) {
	    return units[key].split('_');
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    if (number === 1) {
	        return result + translateSingular(number, withoutSuffix, key[0], isFuture);
	    } else if (withoutSuffix) {
	        return result + (special(number) ? forms(key)[1] : forms(key)[0]);
	    } else {
	        if (isFuture) {
	            return result + forms(key)[1];
	        } else {
	            return result + (special(number) ? forms(key)[1] : forms(key)[2]);
	        }
	    }
	}
	var lt = moment.defineLocale('lt', {
	    months : {
	        format: 'sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio'.split('_'),
	        standalone: 'sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis'.split('_'),
	        isFormat: /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/
	    },
	    monthsShort : 'sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd'.split('_'),
	    weekdays : {
	        format: 'sekmadienį_pirmadienį_antradienį_trečiadienį_ketvirtadienį_penktadienį_šeštadienį'.split('_'),
	        standalone: 'sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis'.split('_'),
	        isFormat: /dddd HH:mm/
	    },
	    weekdaysShort : 'Sek_Pir_Ant_Tre_Ket_Pen_Šeš'.split('_'),
	    weekdaysMin : 'S_P_A_T_K_Pn_Š'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY [m.] MMMM D [d.]',
	        LLL : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	        LLLL : 'YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]',
	        l : 'YYYY-MM-DD',
	        ll : 'YYYY [m.] MMMM D [d.]',
	        lll : 'YYYY [m.] MMMM D [d.], HH:mm [val.]',
	        llll : 'YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]'
	    },
	    calendar : {
	        sameDay : '[Šiandien] LT',
	        nextDay : '[Rytoj] LT',
	        nextWeek : 'dddd LT',
	        lastDay : '[Vakar] LT',
	        lastWeek : '[Praėjusį] dddd LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'po %s',
	        past : 'prieš %s',
	        s : translateSeconds,
	        m : translateSingular,
	        mm : translate,
	        h : translateSingular,
	        hh : translate,
	        d : translateSingular,
	        dd : translate,
	        M : translateSingular,
	        MM : translate,
	        y : translateSingular,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}-oji/,
	    ordinal : function (number) {
	        return number + '-oji';
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return lt;

	})));


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Latvian [lv]
	//! author : Kristaps Karlsons : https://github.com/skakri
	//! author : Jānis Elmeris : https://github.com/JanisE

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var units = {
	    'm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	    'mm': 'minūtes_minūtēm_minūte_minūtes'.split('_'),
	    'h': 'stundas_stundām_stunda_stundas'.split('_'),
	    'hh': 'stundas_stundām_stunda_stundas'.split('_'),
	    'd': 'dienas_dienām_diena_dienas'.split('_'),
	    'dd': 'dienas_dienām_diena_dienas'.split('_'),
	    'M': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	    'MM': 'mēneša_mēnešiem_mēnesis_mēneši'.split('_'),
	    'y': 'gada_gadiem_gads_gadi'.split('_'),
	    'yy': 'gada_gadiem_gads_gadi'.split('_')
	};
	/**
	 * @param withoutSuffix boolean true = a length of time; false = before/after a period of time.
	 */
	function format(forms, number, withoutSuffix) {
	    if (withoutSuffix) {
	        // E.g. "21 minūte", "3 minūtes".
	        return number % 10 === 1 && number % 100 !== 11 ? forms[2] : forms[3];
	    } else {
	        // E.g. "21 minūtes" as in "pēc 21 minūtes".
	        // E.g. "3 minūtēm" as in "pēc 3 minūtēm".
	        return number % 10 === 1 && number % 100 !== 11 ? forms[0] : forms[1];
	    }
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    return number + ' ' + format(units[key], number, withoutSuffix);
	}
	function relativeTimeWithSingular(number, withoutSuffix, key) {
	    return format(units[key], number, withoutSuffix);
	}
	function relativeSeconds(number, withoutSuffix) {
	    return withoutSuffix ? 'dažas sekundes' : 'dažām sekundēm';
	}

	var lv = moment.defineLocale('lv', {
	    months : 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
	    weekdays : 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
	    weekdaysShort : 'Sv_P_O_T_C_Pk_S'.split('_'),
	    weekdaysMin : 'Sv_P_O_T_C_Pk_S'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY.',
	        LL : 'YYYY. [gada] D. MMMM',
	        LLL : 'YYYY. [gada] D. MMMM, HH:mm',
	        LLLL : 'YYYY. [gada] D. MMMM, dddd, HH:mm'
	    },
	    calendar : {
	        sameDay : '[Šodien pulksten] LT',
	        nextDay : '[Rīt pulksten] LT',
	        nextWeek : 'dddd [pulksten] LT',
	        lastDay : '[Vakar pulksten] LT',
	        lastWeek : '[Pagājušā] dddd [pulksten] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'pēc %s',
	        past : 'pirms %s',
	        s : relativeSeconds,
	        m : relativeTimeWithSingular,
	        mm : relativeTimeWithPlural,
	        h : relativeTimeWithSingular,
	        hh : relativeTimeWithPlural,
	        d : relativeTimeWithSingular,
	        dd : relativeTimeWithPlural,
	        M : relativeTimeWithSingular,
	        MM : relativeTimeWithPlural,
	        y : relativeTimeWithSingular,
	        yy : relativeTimeWithPlural
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return lv;

	})));


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Montenegrin [me]
	//! author : Miodrag Nikač <miodrag@restartit.me> : https://github.com/miodragnikac

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var translator = {
	    words: { //Different grammatical cases
	        m: ['jedan minut', 'jednog minuta'],
	        mm: ['minut', 'minuta', 'minuta'],
	        h: ['jedan sat', 'jednog sata'],
	        hh: ['sat', 'sata', 'sati'],
	        dd: ['dan', 'dana', 'dana'],
	        MM: ['mjesec', 'mjeseca', 'mjeseci'],
	        yy: ['godina', 'godine', 'godina']
	    },
	    correctGrammaticalCase: function (number, wordKey) {
	        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	    },
	    translate: function (number, withoutSuffix, key) {
	        var wordKey = translator.words[key];
	        if (key.length === 1) {
	            return withoutSuffix ? wordKey[0] : wordKey[1];
	        } else {
	            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	        }
	    }
	};

	var me = moment.defineLocale('me', {
	    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact : true,
	    weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
	    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm',
	        LLLL: 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar: {
	        sameDay: '[danas u] LT',
	        nextDay: '[sjutra u] LT',

	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedjelju] [u] LT';
	                case 3:
	                    return '[u] [srijedu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[juče u] LT',
	        lastWeek : function () {
	            var lastWeekDays = [
	                '[prošle] [nedjelje] [u] LT',
	                '[prošlog] [ponedjeljka] [u] LT',
	                '[prošlog] [utorka] [u] LT',
	                '[prošle] [srijede] [u] LT',
	                '[prošlog] [četvrtka] [u] LT',
	                '[prošlog] [petka] [u] LT',
	                '[prošle] [subote] [u] LT'
	            ];
	            return lastWeekDays[this.day()];
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'prije %s',
	        s      : 'nekoliko sekundi',
	        m      : translator.translate,
	        mm     : translator.translate,
	        h      : translator.translate,
	        hh     : translator.translate,
	        d      : 'dan',
	        dd     : translator.translate,
	        M      : 'mjesec',
	        MM     : translator.translate,
	        y      : 'godinu',
	        yy     : translator.translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return me;

	})));


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Maori [mi]
	//! author : John Corrigan <robbiecloset@gmail.com> : https://github.com/johnideal

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var mi = moment.defineLocale('mi', {
	    months: 'Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea'.split('_'),
	    monthsShort: 'Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki'.split('_'),
	    monthsRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	    monthsStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	    monthsShortRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,3}/i,
	    monthsShortStrictRegex: /(?:['a-z\u0101\u014D\u016B]+\-?){1,2}/i,
	    weekdays: 'Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei'.split('_'),
	    weekdaysShort: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
	    weekdaysMin: 'Ta_Ma_Tū_We_Tāi_Pa_Hā'.split('_'),
	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY [i] HH:mm',
	        LLLL: 'dddd, D MMMM YYYY [i] HH:mm'
	    },
	    calendar: {
	        sameDay: '[i teie mahana, i] LT',
	        nextDay: '[apopo i] LT',
	        nextWeek: 'dddd [i] LT',
	        lastDay: '[inanahi i] LT',
	        lastWeek: 'dddd [whakamutunga i] LT',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'i roto i %s',
	        past: '%s i mua',
	        s: 'te hēkona ruarua',
	        m: 'he meneti',
	        mm: '%d meneti',
	        h: 'te haora',
	        hh: '%d haora',
	        d: 'he ra',
	        dd: '%d ra',
	        M: 'he marama',
	        MM: '%d marama',
	        y: 'he tau',
	        yy: '%d tau'
	    },
	    ordinalParse: /\d{1,2}º/,
	    ordinal: '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return mi;

	})));


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Macedonian [mk]
	//! author : Borislav Mickov : https://github.com/B0k0

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var mk = moment.defineLocale('mk', {
	    months : 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
	    monthsShort : 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
	    weekdays : 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
	    weekdaysShort : 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
	    weekdaysMin : 'нe_пo_вт_ср_че_пе_сa'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'D.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd, D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay : '[Денес во] LT',
	        nextDay : '[Утре во] LT',
	        nextWeek : '[Во] dddd [во] LT',
	        lastDay : '[Вчера во] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 6:
	                    return '[Изминатата] dddd [во] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[Изминатиот] dddd [во] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'после %s',
	        past : 'пред %s',
	        s : 'неколку секунди',
	        m : 'минута',
	        mm : '%d минути',
	        h : 'час',
	        hh : '%d часа',
	        d : 'ден',
	        dd : '%d дена',
	        M : 'месец',
	        MM : '%d месеци',
	        y : 'година',
	        yy : '%d години'
	    },
	    ordinalParse: /\d{1,2}-(ев|ен|ти|ви|ри|ми)/,
	    ordinal : function (number) {
	        var lastDigit = number % 10,
	            last2Digits = number % 100;
	        if (number === 0) {
	            return number + '-ев';
	        } else if (last2Digits === 0) {
	            return number + '-ен';
	        } else if (last2Digits > 10 && last2Digits < 20) {
	            return number + '-ти';
	        } else if (lastDigit === 1) {
	            return number + '-ви';
	        } else if (lastDigit === 2) {
	            return number + '-ри';
	        } else if (lastDigit === 7 || lastDigit === 8) {
	            return number + '-ми';
	        } else {
	            return number + '-ти';
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return mk;

	})));


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malayalam [ml]
	//! author : Floyd Pink : https://github.com/floydpink

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ml = moment.defineLocale('ml', {
	    months : 'ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ'.split('_'),
	    monthsShort : 'ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച'.split('_'),
	    weekdaysShort : 'ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി'.split('_'),
	    weekdaysMin : 'ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm -നു',
	        LTS : 'A h:mm:ss -നു',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm -നു',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm -നു'
	    },
	    calendar : {
	        sameDay : '[ഇന്ന്] LT',
	        nextDay : '[നാളെ] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[ഇന്നലെ] LT',
	        lastWeek : '[കഴിഞ്ഞ] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s കഴിഞ്ഞ്',
	        past : '%s മുൻപ്',
	        s : 'അൽപ നിമിഷങ്ങൾ',
	        m : 'ഒരു മിനിറ്റ്',
	        mm : '%d മിനിറ്റ്',
	        h : 'ഒരു മണിക്കൂർ',
	        hh : '%d മണിക്കൂർ',
	        d : 'ഒരു ദിവസം',
	        dd : '%d ദിവസം',
	        M : 'ഒരു മാസം',
	        MM : '%d മാസം',
	        y : 'ഒരു വർഷം',
	        yy : '%d വർഷം'
	    },
	    meridiemParse: /രാത്രി|രാവിലെ|ഉച്ച കഴിഞ്ഞ്|വൈകുന്നേരം|രാത്രി/i,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if ((meridiem === 'രാത്രി' && hour >= 4) ||
	                meridiem === 'ഉച്ച കഴിഞ്ഞ്' ||
	                meridiem === 'വൈകുന്നേരം') {
	            return hour + 12;
	        } else {
	            return hour;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'രാത്രി';
	        } else if (hour < 12) {
	            return 'രാവിലെ';
	        } else if (hour < 17) {
	            return 'ഉച്ച കഴിഞ്ഞ്';
	        } else if (hour < 20) {
	            return 'വൈകുന്നേരം';
	        } else {
	            return 'രാത്രി';
	        }
	    }
	});

	return ml;

	})));


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Marathi [mr]
	//! author : Harshad Kale : https://github.com/kalehv
	//! author : Vivek Athalye : https://github.com/vnathalye

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '१',
	    '2': '२',
	    '3': '३',
	    '4': '४',
	    '5': '५',
	    '6': '६',
	    '7': '७',
	    '8': '८',
	    '9': '९',
	    '0': '०'
	};
	var numberMap = {
	    '१': '1',
	    '२': '2',
	    '३': '3',
	    '४': '4',
	    '५': '5',
	    '६': '6',
	    '७': '7',
	    '८': '8',
	    '९': '9',
	    '०': '0'
	};

	function relativeTimeMr(number, withoutSuffix, string, isFuture)
	{
	    var output = '';
	    if (withoutSuffix) {
	        switch (string) {
	            case 's': output = 'काही सेकंद'; break;
	            case 'm': output = 'एक मिनिट'; break;
	            case 'mm': output = '%d मिनिटे'; break;
	            case 'h': output = 'एक तास'; break;
	            case 'hh': output = '%d तास'; break;
	            case 'd': output = 'एक दिवस'; break;
	            case 'dd': output = '%d दिवस'; break;
	            case 'M': output = 'एक महिना'; break;
	            case 'MM': output = '%d महिने'; break;
	            case 'y': output = 'एक वर्ष'; break;
	            case 'yy': output = '%d वर्षे'; break;
	        }
	    }
	    else {
	        switch (string) {
	            case 's': output = 'काही सेकंदां'; break;
	            case 'm': output = 'एका मिनिटा'; break;
	            case 'mm': output = '%d मिनिटां'; break;
	            case 'h': output = 'एका तासा'; break;
	            case 'hh': output = '%d तासां'; break;
	            case 'd': output = 'एका दिवसा'; break;
	            case 'dd': output = '%d दिवसां'; break;
	            case 'M': output = 'एका महिन्या'; break;
	            case 'MM': output = '%d महिन्यां'; break;
	            case 'y': output = 'एका वर्षा'; break;
	            case 'yy': output = '%d वर्षां'; break;
	        }
	    }
	    return output.replace(/%d/i, number);
	}

	var mr = moment.defineLocale('mr', {
	    months : 'जानेवारी_फेब्रुवारी_मार्च_एप्रिल_मे_जून_जुलै_ऑगस्ट_सप्टेंबर_ऑक्टोबर_नोव्हेंबर_डिसेंबर'.split('_'),
	    monthsShort: 'जाने._फेब्रु._मार्च._एप्रि._मे._जून._जुलै._ऑग._सप्टें._ऑक्टो._नोव्हें._डिसें.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'रविवार_सोमवार_मंगळवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
	    weekdaysShort : 'रवि_सोम_मंगळ_बुध_गुरू_शुक्र_शनि'.split('_'),
	    weekdaysMin : 'र_सो_मं_बु_गु_शु_श'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm वाजता',
	        LTS : 'A h:mm:ss वाजता',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm वाजता',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm वाजता'
	    },
	    calendar : {
	        sameDay : '[आज] LT',
	        nextDay : '[उद्या] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[काल] LT',
	        lastWeek: '[मागील] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future: '%sमध्ये',
	        past: '%sपूर्वी',
	        s: relativeTimeMr,
	        m: relativeTimeMr,
	        mm: relativeTimeMr,
	        h: relativeTimeMr,
	        hh: relativeTimeMr,
	        d: relativeTimeMr,
	        dd: relativeTimeMr,
	        M: relativeTimeMr,
	        MM: relativeTimeMr,
	        y: relativeTimeMr,
	        yy: relativeTimeMr
	    },
	    preparse: function (string) {
	        return string.replace(/[१२३४५६७८९०]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /रात्री|सकाळी|दुपारी|सायंकाळी/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'रात्री') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'सकाळी') {
	            return hour;
	        } else if (meridiem === 'दुपारी') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'सायंकाळी') {
	            return hour + 12;
	        }
	    },
	    meridiem: function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'रात्री';
	        } else if (hour < 10) {
	            return 'सकाळी';
	        } else if (hour < 17) {
	            return 'दुपारी';
	        } else if (hour < 20) {
	            return 'सायंकाळी';
	        } else {
	            return 'रात्री';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return mr;

	})));


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malay [ms-my]
	//! note : DEPRECATED, the correct one is [ms]
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var msMy = moment.defineLocale('ms-my', {
	    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /pagi|tengahari|petang|malam/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'pagi') {
	            return hour;
	        } else if (meridiem === 'tengahari') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'petang' || meridiem === 'malam') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'pagi';
	        } else if (hours < 15) {
	            return 'tengahari';
	        } else if (hours < 19) {
	            return 'petang';
	        } else {
	            return 'malam';
	        }
	    },
	    calendar : {
	        sameDay : '[Hari ini pukul] LT',
	        nextDay : '[Esok pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kelmarin pukul] LT',
	        lastWeek : 'dddd [lepas pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'dalam %s',
	        past : '%s yang lepas',
	        s : 'beberapa saat',
	        m : 'seminit',
	        mm : '%d minit',
	        h : 'sejam',
	        hh : '%d jam',
	        d : 'sehari',
	        dd : '%d hari',
	        M : 'sebulan',
	        MM : '%d bulan',
	        y : 'setahun',
	        yy : '%d tahun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return msMy;

	})));


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Malay [ms]
	//! author : Weldan Jamili : https://github.com/weldan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ms = moment.defineLocale('ms', {
	    months : 'Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember'.split('_'),
	    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis'.split('_'),
	    weekdays : 'Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu'.split('_'),
	    weekdaysShort : 'Ahd_Isn_Sel_Rab_Kha_Jum_Sab'.split('_'),
	    weekdaysMin : 'Ah_Is_Sl_Rb_Km_Jm_Sb'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [pukul] HH.mm',
	        LLLL : 'dddd, D MMMM YYYY [pukul] HH.mm'
	    },
	    meridiemParse: /pagi|tengahari|petang|malam/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'pagi') {
	            return hour;
	        } else if (meridiem === 'tengahari') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'petang' || meridiem === 'malam') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'pagi';
	        } else if (hours < 15) {
	            return 'tengahari';
	        } else if (hours < 19) {
	            return 'petang';
	        } else {
	            return 'malam';
	        }
	    },
	    calendar : {
	        sameDay : '[Hari ini pukul] LT',
	        nextDay : '[Esok pukul] LT',
	        nextWeek : 'dddd [pukul] LT',
	        lastDay : '[Kelmarin pukul] LT',
	        lastWeek : 'dddd [lepas pukul] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'dalam %s',
	        past : '%s yang lepas',
	        s : 'beberapa saat',
	        m : 'seminit',
	        mm : '%d minit',
	        h : 'sejam',
	        hh : '%d jam',
	        d : 'sehari',
	        dd : '%d hari',
	        M : 'sebulan',
	        MM : '%d bulan',
	        y : 'setahun',
	        yy : '%d tahun'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ms;

	})));


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Burmese [my]
	//! author : Squar team, mysquar.com
	//! author : David Rossellat : https://github.com/gholadr
	//! author : Tin Aung Lin : https://github.com/thanyawzinmin

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '၁',
	    '2': '၂',
	    '3': '၃',
	    '4': '၄',
	    '5': '၅',
	    '6': '၆',
	    '7': '၇',
	    '8': '၈',
	    '9': '၉',
	    '0': '၀'
	};
	var numberMap = {
	    '၁': '1',
	    '၂': '2',
	    '၃': '3',
	    '၄': '4',
	    '၅': '5',
	    '၆': '6',
	    '၇': '7',
	    '၈': '8',
	    '၉': '9',
	    '၀': '0'
	};

	var my = moment.defineLocale('my', {
	    months: 'ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ'.split('_'),
	    monthsShort: 'ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ'.split('_'),
	    weekdays: 'တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ'.split('_'),
	    weekdaysShort: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),
	    weekdaysMin: 'နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ'.split('_'),

	    longDateFormat: {
	        LT: 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L: 'DD/MM/YYYY',
	        LL: 'D MMMM YYYY',
	        LLL: 'D MMMM YYYY HH:mm',
	        LLLL: 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar: {
	        sameDay: '[ယနေ.] LT [မှာ]',
	        nextDay: '[မနက်ဖြန်] LT [မှာ]',
	        nextWeek: 'dddd LT [မှာ]',
	        lastDay: '[မနေ.က] LT [မှာ]',
	        lastWeek: '[ပြီးခဲ့သော] dddd LT [မှာ]',
	        sameElse: 'L'
	    },
	    relativeTime: {
	        future: 'လာမည့် %s မှာ',
	        past: 'လွန်ခဲ့သော %s က',
	        s: 'စက္ကန်.အနည်းငယ်',
	        m: 'တစ်မိနစ်',
	        mm: '%d မိနစ်',
	        h: 'တစ်နာရီ',
	        hh: '%d နာရီ',
	        d: 'တစ်ရက်',
	        dd: '%d ရက်',
	        M: 'တစ်လ',
	        MM: '%d လ',
	        y: 'တစ်နှစ်',
	        yy: '%d နှစ်'
	    },
	    preparse: function (string) {
	        return string.replace(/[၁၂၃၄၅၆၇၈၉၀]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    week: {
	        dow: 1, // Monday is the first day of the week.
	        doy: 4 // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return my;

	})));


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Norwegian Bokmål [nb]
	//! authors : Espen Hovlandsdal : https://github.com/rexxars
	//!           Sigurd Gartmann : https://github.com/sigurdga

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var nb = moment.defineLocale('nb', {
	    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	    monthsShort : 'jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag'.split('_'),
	    weekdaysShort : 'sø._ma._ti._on._to._fr._lø.'.split('_'),
	    weekdaysMin : 'sø_ma_ti_on_to_fr_lø'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY [kl.] HH:mm',
	        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	    },
	    calendar : {
	        sameDay: '[i dag kl.] LT',
	        nextDay: '[i morgen kl.] LT',
	        nextWeek: 'dddd [kl.] LT',
	        lastDay: '[i går kl.] LT',
	        lastWeek: '[forrige] dddd [kl.] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : '%s siden',
	        s : 'noen sekunder',
	        m : 'ett minutt',
	        mm : '%d minutter',
	        h : 'en time',
	        hh : '%d timer',
	        d : 'en dag',
	        dd : '%d dager',
	        M : 'en måned',
	        MM : '%d måneder',
	        y : 'ett år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return nb;

	})));


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Nepalese [ne]
	//! author : suvash : https://github.com/suvash

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '१',
	    '2': '२',
	    '3': '३',
	    '4': '४',
	    '5': '५',
	    '6': '६',
	    '7': '७',
	    '8': '८',
	    '9': '९',
	    '0': '०'
	};
	var numberMap = {
	    '१': '1',
	    '२': '2',
	    '३': '3',
	    '४': '4',
	    '५': '5',
	    '६': '6',
	    '७': '7',
	    '८': '8',
	    '९': '9',
	    '०': '0'
	};

	var ne = moment.defineLocale('ne', {
	    months : 'जनवरी_फेब्रुवरी_मार्च_अप्रिल_मई_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर'.split('_'),
	    monthsShort : 'जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार'.split('_'),
	    weekdaysShort : 'आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.'.split('_'),
	    weekdaysMin : 'आ._सो._मं._बु._बि._शु._श.'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'Aको h:mm बजे',
	        LTS : 'Aको h:mm:ss बजे',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, Aको h:mm बजे',
	        LLLL : 'dddd, D MMMM YYYY, Aको h:mm बजे'
	    },
	    preparse: function (string) {
	        return string.replace(/[१२३४५६७८९०]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    meridiemParse: /राति|बिहान|दिउँसो|साँझ/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'राति') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'बिहान') {
	            return hour;
	        } else if (meridiem === 'दिउँसो') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'साँझ') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 3) {
	            return 'राति';
	        } else if (hour < 12) {
	            return 'बिहान';
	        } else if (hour < 16) {
	            return 'दिउँसो';
	        } else if (hour < 20) {
	            return 'साँझ';
	        } else {
	            return 'राति';
	        }
	    },
	    calendar : {
	        sameDay : '[आज] LT',
	        nextDay : '[भोलि] LT',
	        nextWeek : '[आउँदो] dddd[,] LT',
	        lastDay : '[हिजो] LT',
	        lastWeek : '[गएको] dddd[,] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%sमा',
	        past : '%s अगाडि',
	        s : 'केही क्षण',
	        m : 'एक मिनेट',
	        mm : '%d मिनेट',
	        h : 'एक घण्टा',
	        hh : '%d घण्टा',
	        d : 'एक दिन',
	        dd : '%d दिन',
	        M : 'एक महिना',
	        MM : '%d महिना',
	        y : 'एक बर्ष',
	        yy : '%d बर्ष'
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ne;

	})));


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Dutch (Belgium) [nl-be]
	//! author : Joris Röling : https://github.com/jorisroling
	//! author : Jacob Middag : https://github.com/middagj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
	var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

	var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
	var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

	var nlBe = moment.defineLocale('nl-be', {
	    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShortWithoutDots[m.month()];
	        } else {
	            return monthsShortWithDots[m.month()];
	        }
	    },

	    monthsRegex: monthsRegex,
	    monthsShortRegex: monthsRegex,
	    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
	    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

	    monthsParse : monthsParse,
	    longMonthsParse : monthsParse,
	    shortMonthsParse : monthsParse,

	    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	    weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[vandaag om] LT',
	        nextDay: '[morgen om] LT',
	        nextWeek: 'dddd [om] LT',
	        lastDay: '[gisteren om] LT',
	        lastWeek: '[afgelopen] dddd [om] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'over %s',
	        past : '%s geleden',
	        s : 'een paar seconden',
	        m : 'één minuut',
	        mm : '%d minuten',
	        h : 'één uur',
	        hh : '%d uur',
	        d : 'één dag',
	        dd : '%d dagen',
	        M : 'één maand',
	        MM : '%d maanden',
	        y : 'één jaar',
	        yy : '%d jaar'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return nlBe;

	})));


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Dutch [nl]
	//! author : Joris Röling : https://github.com/jorisroling
	//! author : Jacob Middag : https://github.com/middagj

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_');
	var monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');

	var monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
	var monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;

	var nl = moment.defineLocale('nl', {
	    months : 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
	    monthsShort : function (m, format) {
	        if (/-MMM-/.test(format)) {
	            return monthsShortWithoutDots[m.month()];
	        } else {
	            return monthsShortWithDots[m.month()];
	        }
	    },

	    monthsRegex: monthsRegex,
	    monthsShortRegex: monthsRegex,
	    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
	    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,

	    monthsParse : monthsParse,
	    longMonthsParse : monthsParse,
	    shortMonthsParse : monthsParse,

	    weekdays : 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
	    weekdaysShort : 'zo._ma._di._wo._do._vr._za.'.split('_'),
	    weekdaysMin : 'Zo_Ma_Di_Wo_Do_Vr_Za'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD-MM-YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[vandaag om] LT',
	        nextDay: '[morgen om] LT',
	        nextWeek: 'dddd [om] LT',
	        lastDay: '[gisteren om] LT',
	        lastWeek: '[afgelopen] dddd [om] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'over %s',
	        past : '%s geleden',
	        s : 'een paar seconden',
	        m : 'één minuut',
	        mm : '%d minuten',
	        h : 'één uur',
	        hh : '%d uur',
	        d : 'één dag',
	        dd : '%d dagen',
	        M : 'één maand',
	        MM : '%d maanden',
	        y : 'één jaar',
	        yy : '%d jaar'
	    },
	    ordinalParse: /\d{1,2}(ste|de)/,
	    ordinal : function (number) {
	        return number + ((number === 1 || number === 8 || number >= 20) ? 'ste' : 'de');
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return nl;

	})));


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Nynorsk [nn]
	//! author : https://github.com/mechuwind

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var nn = moment.defineLocale('nn', {
	    months : 'januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des'.split('_'),
	    weekdays : 'sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag'.split('_'),
	    weekdaysShort : 'sun_mån_tys_ons_tor_fre_lau'.split('_'),
	    weekdaysMin : 'su_må_ty_on_to_fr_lø'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY [kl.] H:mm',
	        LLLL : 'dddd D. MMMM YYYY [kl.] HH:mm'
	    },
	    calendar : {
	        sameDay: '[I dag klokka] LT',
	        nextDay: '[I morgon klokka] LT',
	        nextWeek: 'dddd [klokka] LT',
	        lastDay: '[I går klokka] LT',
	        lastWeek: '[Føregåande] dddd [klokka] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : '%s sidan',
	        s : 'nokre sekund',
	        m : 'eit minutt',
	        mm : '%d minutt',
	        h : 'ein time',
	        hh : '%d timar',
	        d : 'ein dag',
	        dd : '%d dagar',
	        M : 'ein månad',
	        MM : '%d månader',
	        y : 'eit år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return nn;

	})));


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Punjabi (India) [pa-in]
	//! author : Harpreet Singh : https://github.com/harpreetkhalsagtbit

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '੧',
	    '2': '੨',
	    '3': '੩',
	    '4': '੪',
	    '5': '੫',
	    '6': '੬',
	    '7': '੭',
	    '8': '੮',
	    '9': '੯',
	    '0': '੦'
	};
	var numberMap = {
	    '੧': '1',
	    '੨': '2',
	    '੩': '3',
	    '੪': '4',
	    '੫': '5',
	    '੬': '6',
	    '੭': '7',
	    '੮': '8',
	    '੯': '9',
	    '੦': '0'
	};

	var paIn = moment.defineLocale('pa-in', {
	    // There are months name as per Nanakshahi Calender but they are not used as rigidly in modern Punjabi.
	    months : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	    monthsShort : 'ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ'.split('_'),
	    weekdays : 'ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ'.split('_'),
	    weekdaysShort : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	    weekdaysMin : 'ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm ਵਜੇ',
	        LTS : 'A h:mm:ss ਵਜੇ',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm ਵਜੇ',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm ਵਜੇ'
	    },
	    calendar : {
	        sameDay : '[ਅਜ] LT',
	        nextDay : '[ਕਲ] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[ਕਲ] LT',
	        lastWeek : '[ਪਿਛਲੇ] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s ਵਿੱਚ',
	        past : '%s ਪਿਛਲੇ',
	        s : 'ਕੁਝ ਸਕਿੰਟ',
	        m : 'ਇਕ ਮਿੰਟ',
	        mm : '%d ਮਿੰਟ',
	        h : 'ਇੱਕ ਘੰਟਾ',
	        hh : '%d ਘੰਟੇ',
	        d : 'ਇੱਕ ਦਿਨ',
	        dd : '%d ਦਿਨ',
	        M : 'ਇੱਕ ਮਹੀਨਾ',
	        MM : '%d ਮਹੀਨੇ',
	        y : 'ਇੱਕ ਸਾਲ',
	        yy : '%d ਸਾਲ'
	    },
	    preparse: function (string) {
	        return string.replace(/[੧੨੩੪੫੬੭੮੯੦]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    // Punjabi notation for meridiems are quite fuzzy in practice. While there exists
	    // a rigid notion of a 'Pahar' it is not used as rigidly in modern Punjabi.
	    meridiemParse: /ਰਾਤ|ਸਵੇਰ|ਦੁਪਹਿਰ|ਸ਼ਾਮ/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'ਰਾਤ') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'ਸਵੇਰ') {
	            return hour;
	        } else if (meridiem === 'ਦੁਪਹਿਰ') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'ਸ਼ਾਮ') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ਰਾਤ';
	        } else if (hour < 10) {
	            return 'ਸਵੇਰ';
	        } else if (hour < 17) {
	            return 'ਦੁਪਹਿਰ';
	        } else if (hour < 20) {
	            return 'ਸ਼ਾਮ';
	        } else {
	            return 'ਰਾਤ';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return paIn;

	})));


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Polish [pl]
	//! author : Rafal Hirsz : https://github.com/evoL

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
	var monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
	function plural(n) {
	    return (n % 10 < 5) && (n % 10 > 1) && ((~~(n / 10) % 10) !== 1);
	}
	function translate(number, withoutSuffix, key) {
	    var result = number + ' ';
	    switch (key) {
	        case 'm':
	            return withoutSuffix ? 'minuta' : 'minutę';
	        case 'mm':
	            return result + (plural(number) ? 'minuty' : 'minut');
	        case 'h':
	            return withoutSuffix  ? 'godzina'  : 'godzinę';
	        case 'hh':
	            return result + (plural(number) ? 'godziny' : 'godzin');
	        case 'MM':
	            return result + (plural(number) ? 'miesiące' : 'miesięcy');
	        case 'yy':
	            return result + (plural(number) ? 'lata' : 'lat');
	    }
	}

	var pl = moment.defineLocale('pl', {
	    months : function (momentToFormat, format) {
	        if (format === '') {
	            // Hack: if format empty we know this is used to generate
	            // RegExp by moment. Give then back both valid forms of months
	            // in RegExp ready format.
	            return '(' + monthsSubjective[momentToFormat.month()] + '|' + monthsNominative[momentToFormat.month()] + ')';
	        } else if (/D MMMM/.test(format)) {
	            return monthsSubjective[momentToFormat.month()];
	        } else {
	            return monthsNominative[momentToFormat.month()];
	        }
	    },
	    monthsShort : 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
	    weekdays : 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
	    weekdaysShort : 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
	    weekdaysMin : 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Dziś o] LT',
	        nextDay: '[Jutro o] LT',
	        nextWeek: '[W] dddd [o] LT',
	        lastDay: '[Wczoraj o] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[W zeszłą niedzielę o] LT';
	                case 3:
	                    return '[W zeszłą środę o] LT';
	                case 6:
	                    return '[W zeszłą sobotę o] LT';
	                default:
	                    return '[W zeszły] dddd [o] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past : '%s temu',
	        s : 'kilka sekund',
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : '1 dzień',
	        dd : '%d dni',
	        M : 'miesiąc',
	        MM : translate,
	        y : 'rok',
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return pl;

	})));


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Portuguese (Brazil) [pt-br]
	//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var ptBr = moment.defineLocale('pt-br', {
	    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	    weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
	    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	    weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
	    },
	    calendar : {
	        sameDay: '[Hoje às] LT',
	        nextDay: '[Amanhã às] LT',
	        nextWeek: 'dddd [às] LT',
	        lastDay: '[Ontem às] LT',
	        lastWeek: function () {
	            return (this.day() === 0 || this.day() === 6) ?
	                '[Último] dddd [às] LT' : // Saturday + Sunday
	                '[Última] dddd [às] LT'; // Monday - Friday
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'em %s',
	        past : '%s atrás',
	        s : 'poucos segundos',
	        m : 'um minuto',
	        mm : '%d minutos',
	        h : 'uma hora',
	        hh : '%d horas',
	        d : 'um dia',
	        dd : '%d dias',
	        M : 'um mês',
	        MM : '%d meses',
	        y : 'um ano',
	        yy : '%d anos'
	    },
	    ordinalParse: /\d{1,2}º/,
	    ordinal : '%dº'
	});

	return ptBr;

	})));


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Portuguese [pt]
	//! author : Jefferson : https://github.com/jalex79

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var pt = moment.defineLocale('pt', {
	    months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
	    weekdays : 'Domingo_Segunda-Feira_Terça-Feira_Quarta-Feira_Quinta-Feira_Sexta-Feira_Sábado'.split('_'),
	    weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
	    weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D [de] MMMM [de] YYYY',
	        LLL : 'D [de] MMMM [de] YYYY HH:mm',
	        LLLL : 'dddd, D [de] MMMM [de] YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Hoje às] LT',
	        nextDay: '[Amanhã às] LT',
	        nextWeek: 'dddd [às] LT',
	        lastDay: '[Ontem às] LT',
	        lastWeek: function () {
	            return (this.day() === 0 || this.day() === 6) ?
	                '[Último] dddd [às] LT' : // Saturday + Sunday
	                '[Última] dddd [às] LT'; // Monday - Friday
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'em %s',
	        past : 'há %s',
	        s : 'segundos',
	        m : 'um minuto',
	        mm : '%d minutos',
	        h : 'uma hora',
	        hh : '%d horas',
	        d : 'um dia',
	        dd : '%d dias',
	        M : 'um mês',
	        MM : '%d meses',
	        y : 'um ano',
	        yy : '%d anos'
	    },
	    ordinalParse: /\d{1,2}º/,
	    ordinal : '%dº',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return pt;

	})));


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Romanian [ro]
	//! author : Vlad Gurdiga : https://github.com/gurdiga
	//! author : Valentin Agachi : https://github.com/avaly

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	            'mm': 'minute',
	            'hh': 'ore',
	            'dd': 'zile',
	            'MM': 'luni',
	            'yy': 'ani'
	        },
	        separator = ' ';
	    if (number % 100 >= 20 || (number >= 100 && number % 100 === 0)) {
	        separator = ' de ';
	    }
	    return number + separator + format[key];
	}

	var ro = moment.defineLocale('ro', {
	    months : 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
	    monthsShort : 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
	    weekdaysShort : 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
	    weekdaysMin : 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY H:mm',
	        LLLL : 'dddd, D MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay: '[azi la] LT',
	        nextDay: '[mâine la] LT',
	        nextWeek: 'dddd [la] LT',
	        lastDay: '[ieri la] LT',
	        lastWeek: '[fosta] dddd [la] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'peste %s',
	        past : '%s în urmă',
	        s : 'câteva secunde',
	        m : 'un minut',
	        mm : relativeTimeWithPlural,
	        h : 'o oră',
	        hh : relativeTimeWithPlural,
	        d : 'o zi',
	        dd : relativeTimeWithPlural,
	        M : 'o lună',
	        MM : relativeTimeWithPlural,
	        y : 'un an',
	        yy : relativeTimeWithPlural
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ro;

	})));


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Russian [ru]
	//! author : Viktorminator : https://github.com/Viktorminator
	//! Author : Menelion Elensúle : https://github.com/Oire
	//! author : Коренберг Марк : https://github.com/socketpair

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function plural(word, num) {
	    var forms = word.split('_');
	    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	        'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
	        'hh': 'час_часа_часов',
	        'dd': 'день_дня_дней',
	        'MM': 'месяц_месяца_месяцев',
	        'yy': 'год_года_лет'
	    };
	    if (key === 'm') {
	        return withoutSuffix ? 'минута' : 'минуту';
	    }
	    else {
	        return number + ' ' + plural(format[key], +number);
	    }
	}
	var monthsParse = [/^янв/i, /^фев/i, /^мар/i, /^апр/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^авг/i, /^сен/i, /^окт/i, /^ноя/i, /^дек/i];

	// http://new.gramota.ru/spravka/rules/139-prop : § 103
	// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
	// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
	var ru = moment.defineLocale('ru', {
	    months : {
	        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
	        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
	    },
	    monthsShort : {
	        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку ?
	        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'),
	        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split('_')
	    },
	    weekdays : {
	        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'),
	        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split('_'),
	        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?\] ?dddd/
	    },
	    weekdaysShort : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	    weekdaysMin : 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
	    monthsParse : monthsParse,
	    longMonthsParse : monthsParse,
	    shortMonthsParse : monthsParse,

	    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
	    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

	    // копия предыдущего
	    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

	    // полные названия с падежами
	    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

	    // Выражение, которое соотвествует только сокращённым формам
	    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY г.',
	        LLL : 'D MMMM YYYY г., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY г., HH:mm'
	    },
	    calendar : {
	        sameDay: '[Сегодня в] LT',
	        nextDay: '[Завтра в] LT',
	        lastDay: '[Вчера в] LT',
	        nextWeek: function (now) {
	            if (now.week() !== this.week()) {
	                switch (this.day()) {
	                    case 0:
	                        return '[В следующее] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В следующий] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В следующую] dddd [в] LT';
	                }
	            } else {
	                if (this.day() === 2) {
	                    return '[Во] dddd [в] LT';
	                } else {
	                    return '[В] dddd [в] LT';
	                }
	            }
	        },
	        lastWeek: function (now) {
	            if (now.week() !== this.week()) {
	                switch (this.day()) {
	                    case 0:
	                        return '[В прошлое] dddd [в] LT';
	                    case 1:
	                    case 2:
	                    case 4:
	                        return '[В прошлый] dddd [в] LT';
	                    case 3:
	                    case 5:
	                    case 6:
	                        return '[В прошлую] dddd [в] LT';
	                }
	            } else {
	                if (this.day() === 2) {
	                    return '[Во] dddd [в] LT';
	                } else {
	                    return '[В] dddd [в] LT';
	                }
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'через %s',
	        past : '%s назад',
	        s : 'несколько секунд',
	        m : relativeTimeWithPlural,
	        mm : relativeTimeWithPlural,
	        h : 'час',
	        hh : relativeTimeWithPlural,
	        d : 'день',
	        dd : relativeTimeWithPlural,
	        M : 'месяц',
	        MM : relativeTimeWithPlural,
	        y : 'год',
	        yy : relativeTimeWithPlural
	    },
	    meridiemParse: /ночи|утра|дня|вечера/i,
	    isPM : function (input) {
	        return /^(дня|вечера)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ночи';
	        } else if (hour < 12) {
	            return 'утра';
	        } else if (hour < 17) {
	            return 'дня';
	        } else {
	            return 'вечера';
	        }
	    },
	    ordinalParse: /\d{1,2}-(й|го|я)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            case 'w':
	            case 'W':
	                return number + '-я';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ru;

	})));


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Northern Sami [se]
	//! authors : Bård Rolstad Henriksen : https://github.com/karamell

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';



	var se = moment.defineLocale('se', {
	    months : 'ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu'.split('_'),
	    monthsShort : 'ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov'.split('_'),
	    weekdays : 'sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat'.split('_'),
	    weekdaysShort : 'sotn_vuos_maŋ_gask_duor_bear_láv'.split('_'),
	    weekdaysMin : 's_v_m_g_d_b_L'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'MMMM D. [b.] YYYY',
	        LLL : 'MMMM D. [b.] YYYY [ti.] HH:mm',
	        LLLL : 'dddd, MMMM D. [b.] YYYY [ti.] HH:mm'
	    },
	    calendar : {
	        sameDay: '[otne ti] LT',
	        nextDay: '[ihttin ti] LT',
	        nextWeek: 'dddd [ti] LT',
	        lastDay: '[ikte ti] LT',
	        lastWeek: '[ovddit] dddd [ti] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : '%s geažes',
	        past : 'maŋit %s',
	        s : 'moadde sekunddat',
	        m : 'okta minuhta',
	        mm : '%d minuhtat',
	        h : 'okta diimmu',
	        hh : '%d diimmut',
	        d : 'okta beaivi',
	        dd : '%d beaivvit',
	        M : 'okta mánnu',
	        MM : '%d mánut',
	        y : 'okta jahki',
	        yy : '%d jagit'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return se;

	})));


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Sinhalese [si]
	//! author : Sampath Sitinamaluwa : https://github.com/sampathsris

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	/*jshint -W100*/
	var si = moment.defineLocale('si', {
	    months : 'ජනවාරි_පෙබරවාරි_මාර්තු_අප්‍රේල්_මැයි_ජූනි_ජූලි_අගෝස්තු_සැප්තැම්බර්_ඔක්තෝබර්_නොවැම්බර්_දෙසැම්බර්'.split('_'),
	    monthsShort : 'ජන_පෙබ_මාර්_අප්_මැයි_ජූනි_ජූලි_අගෝ_සැප්_ඔක්_නොවැ_දෙසැ'.split('_'),
	    weekdays : 'ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා'.split('_'),
	    weekdaysShort : 'ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන'.split('_'),
	    weekdaysMin : 'ඉ_ස_අ_බ_බ්‍ර_සි_සෙ'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'a h:mm',
	        LTS : 'a h:mm:ss',
	        L : 'YYYY/MM/DD',
	        LL : 'YYYY MMMM D',
	        LLL : 'YYYY MMMM D, a h:mm',
	        LLLL : 'YYYY MMMM D [වැනි] dddd, a h:mm:ss'
	    },
	    calendar : {
	        sameDay : '[අද] LT[ට]',
	        nextDay : '[හෙට] LT[ට]',
	        nextWeek : 'dddd LT[ට]',
	        lastDay : '[ඊයේ] LT[ට]',
	        lastWeek : '[පසුගිය] dddd LT[ට]',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%sකින්',
	        past : '%sකට පෙර',
	        s : 'තත්පර කිහිපය',
	        m : 'මිනිත්තුව',
	        mm : 'මිනිත්තු %d',
	        h : 'පැය',
	        hh : 'පැය %d',
	        d : 'දිනය',
	        dd : 'දින %d',
	        M : 'මාසය',
	        MM : 'මාස %d',
	        y : 'වසර',
	        yy : 'වසර %d'
	    },
	    ordinalParse: /\d{1,2} වැනි/,
	    ordinal : function (number) {
	        return number + ' වැනි';
	    },
	    meridiemParse : /පෙර වරු|පස් වරු|පෙ.ව|ප.ව./,
	    isPM : function (input) {
	        return input === 'ප.ව.' || input === 'පස් වරු';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'ප.ව.' : 'පස් වරු';
	        } else {
	            return isLower ? 'පෙ.ව.' : 'පෙර වරු';
	        }
	    }
	});

	return si;

	})));


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Slovak [sk]
	//! author : Martin Minka : https://github.com/k2s
	//! based on work of petrbela : https://github.com/petrbela

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var months = 'január_február_marec_apríl_máj_jún_júl_august_september_október_november_december'.split('_');
	var monthsShort = 'jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec'.split('_');
	function plural(n) {
	    return (n > 1) && (n < 5);
	}
	function translate(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':  // a few seconds / in a few seconds / a few seconds ago
	            return (withoutSuffix || isFuture) ? 'pár sekúnd' : 'pár sekundami';
	        case 'm':  // a minute / in a minute / a minute ago
	            return withoutSuffix ? 'minúta' : (isFuture ? 'minútu' : 'minútou');
	        case 'mm': // 9 minutes / in 9 minutes / 9 minutes ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'minúty' : 'minút');
	            } else {
	                return result + 'minútami';
	            }
	            break;
	        case 'h':  // an hour / in an hour / an hour ago
	            return withoutSuffix ? 'hodina' : (isFuture ? 'hodinu' : 'hodinou');
	        case 'hh': // 9 hours / in 9 hours / 9 hours ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'hodiny' : 'hodín');
	            } else {
	                return result + 'hodinami';
	            }
	            break;
	        case 'd':  // a day / in a day / a day ago
	            return (withoutSuffix || isFuture) ? 'deň' : 'dňom';
	        case 'dd': // 9 days / in 9 days / 9 days ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'dni' : 'dní');
	            } else {
	                return result + 'dňami';
	            }
	            break;
	        case 'M':  // a month / in a month / a month ago
	            return (withoutSuffix || isFuture) ? 'mesiac' : 'mesiacom';
	        case 'MM': // 9 months / in 9 months / 9 months ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'mesiace' : 'mesiacov');
	            } else {
	                return result + 'mesiacmi';
	            }
	            break;
	        case 'y':  // a year / in a year / a year ago
	            return (withoutSuffix || isFuture) ? 'rok' : 'rokom';
	        case 'yy': // 9 years / in 9 years / 9 years ago
	            if (withoutSuffix || isFuture) {
	                return result + (plural(number) ? 'roky' : 'rokov');
	            } else {
	                return result + 'rokmi';
	            }
	            break;
	    }
	}

	var sk = moment.defineLocale('sk', {
	    months : months,
	    monthsShort : monthsShort,
	    weekdays : 'nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota'.split('_'),
	    weekdaysShort : 'ne_po_ut_st_št_pi_so'.split('_'),
	    weekdaysMin : 'ne_po_ut_st_št_pi_so'.split('_'),
	    longDateFormat : {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay: '[dnes o] LT',
	        nextDay: '[zajtra o] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[v nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[v] dddd [o] LT';
	                case 3:
	                    return '[v stredu o] LT';
	                case 4:
	                    return '[vo štvrtok o] LT';
	                case 5:
	                    return '[v piatok o] LT';
	                case 6:
	                    return '[v sobotu o] LT';
	            }
	        },
	        lastDay: '[včera o] LT',
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[minulú nedeľu o] LT';
	                case 1:
	                case 2:
	                    return '[minulý] dddd [o] LT';
	                case 3:
	                    return '[minulú stredu o] LT';
	                case 4:
	                case 5:
	                    return '[minulý] dddd [o] LT';
	                case 6:
	                    return '[minulú sobotu o] LT';
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past : 'pred %s',
	        s : translate,
	        m : translate,
	        mm : translate,
	        h : translate,
	        hh : translate,
	        d : translate,
	        dd : translate,
	        M : translate,
	        MM : translate,
	        y : translate,
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return sk;

	})));


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Slovenian [sl]
	//! author : Robert Sedovšek : https://github.com/sedovsek

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var result = number + ' ';
	    switch (key) {
	        case 's':
	            return withoutSuffix || isFuture ? 'nekaj sekund' : 'nekaj sekundami';
	        case 'm':
	            return withoutSuffix ? 'ena minuta' : 'eno minuto';
	        case 'mm':
	            if (number === 1) {
	                result += withoutSuffix ? 'minuta' : 'minuto';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'minuti' : 'minutama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'minute' : 'minutami';
	            } else {
	                result += withoutSuffix || isFuture ? 'minut' : 'minutami';
	            }
	            return result;
	        case 'h':
	            return withoutSuffix ? 'ena ura' : 'eno uro';
	        case 'hh':
	            if (number === 1) {
	                result += withoutSuffix ? 'ura' : 'uro';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'uri' : 'urama';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'ure' : 'urami';
	            } else {
	                result += withoutSuffix || isFuture ? 'ur' : 'urami';
	            }
	            return result;
	        case 'd':
	            return withoutSuffix || isFuture ? 'en dan' : 'enim dnem';
	        case 'dd':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'dan' : 'dnem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevoma';
	            } else {
	                result += withoutSuffix || isFuture ? 'dni' : 'dnevi';
	            }
	            return result;
	        case 'M':
	            return withoutSuffix || isFuture ? 'en mesec' : 'enim mesecem';
	        case 'MM':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'mesec' : 'mesecem';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'meseca' : 'mesecema';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'mesece' : 'meseci';
	            } else {
	                result += withoutSuffix || isFuture ? 'mesecev' : 'meseci';
	            }
	            return result;
	        case 'y':
	            return withoutSuffix || isFuture ? 'eno leto' : 'enim letom';
	        case 'yy':
	            if (number === 1) {
	                result += withoutSuffix || isFuture ? 'leto' : 'letom';
	            } else if (number === 2) {
	                result += withoutSuffix || isFuture ? 'leti' : 'letoma';
	            } else if (number < 5) {
	                result += withoutSuffix || isFuture ? 'leta' : 'leti';
	            } else {
	                result += withoutSuffix || isFuture ? 'let' : 'leti';
	            }
	            return result;
	    }
	}

	var sl = moment.defineLocale('sl', {
	    months : 'januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december'.split('_'),
	    monthsShort : 'jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota'.split('_'),
	    weekdaysShort : 'ned._pon._tor._sre._čet._pet._sob.'.split('_'),
	    weekdaysMin : 'ne_po_to_sr_če_pe_so'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM YYYY',
	        LLL : 'D. MMMM YYYY H:mm',
	        LLLL : 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar : {
	        sameDay  : '[danes ob] LT',
	        nextDay  : '[jutri ob] LT',

	        nextWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[v] [nedeljo] [ob] LT';
	                case 3:
	                    return '[v] [sredo] [ob] LT';
	                case 6:
	                    return '[v] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[v] dddd [ob] LT';
	            }
	        },
	        lastDay  : '[včeraj ob] LT',
	        lastWeek : function () {
	            switch (this.day()) {
	                case 0:
	                    return '[prejšnjo] [nedeljo] [ob] LT';
	                case 3:
	                    return '[prejšnjo] [sredo] [ob] LT';
	                case 6:
	                    return '[prejšnjo] [soboto] [ob] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[prejšnji] dddd [ob] LT';
	            }
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'čez %s',
	        past   : 'pred %s',
	        s      : processRelativeTime,
	        m      : processRelativeTime,
	        mm     : processRelativeTime,
	        h      : processRelativeTime,
	        hh     : processRelativeTime,
	        d      : processRelativeTime,
	        dd     : processRelativeTime,
	        M      : processRelativeTime,
	        MM     : processRelativeTime,
	        y      : processRelativeTime,
	        yy     : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return sl;

	})));


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Albanian [sq]
	//! author : Flakërim Ismani : https://github.com/flakerimi
	//! author : Menelion Elensúle : https://github.com/Oire
	//! author : Oerd Cukalla : https://github.com/oerd

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var sq = moment.defineLocale('sq', {
	    months : 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
	    monthsShort : 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
	    weekdays : 'E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
	    weekdaysShort : 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
	    weekdaysMin : 'D_H_Ma_Më_E_P_Sh'.split('_'),
	    weekdaysParseExact : true,
	    meridiemParse: /PD|MD/,
	    isPM: function (input) {
	        return input.charAt(0) === 'M';
	    },
	    meridiem : function (hours, minutes, isLower) {
	        return hours < 12 ? 'PD' : 'MD';
	    },
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[Sot në] LT',
	        nextDay : '[Nesër në] LT',
	        nextWeek : 'dddd [në] LT',
	        lastDay : '[Dje në] LT',
	        lastWeek : 'dddd [e kaluar në] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'në %s',
	        past : '%s më parë',
	        s : 'disa sekonda',
	        m : 'një minutë',
	        mm : '%d minuta',
	        h : 'një orë',
	        hh : '%d orë',
	        d : 'një ditë',
	        dd : '%d ditë',
	        M : 'një muaj',
	        MM : '%d muaj',
	        y : 'një vit',
	        yy : '%d vite'
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return sq;

	})));


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian Cyrillic [sr-cyrl]
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var translator = {
	    words: { //Different grammatical cases
	        m: ['један минут', 'једне минуте'],
	        mm: ['минут', 'минуте', 'минута'],
	        h: ['један сат', 'једног сата'],
	        hh: ['сат', 'сата', 'сати'],
	        dd: ['дан', 'дана', 'дана'],
	        MM: ['месец', 'месеца', 'месеци'],
	        yy: ['година', 'године', 'година']
	    },
	    correctGrammaticalCase: function (number, wordKey) {
	        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	    },
	    translate: function (number, withoutSuffix, key) {
	        var wordKey = translator.words[key];
	        if (key.length === 1) {
	            return withoutSuffix ? wordKey[0] : wordKey[1];
	        } else {
	            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	        }
	    }
	};

	var srCyrl = moment.defineLocale('sr-cyrl', {
	    months: 'јануар_фебруар_март_април_мај_јун_јул_август_септембар_октобар_новембар_децембар'.split('_'),
	    monthsShort: 'јан._феб._мар._апр._мај_јун_јул_авг._сеп._окт._нов._дец.'.split('_'),
	    monthsParseExact: true,
	    weekdays: 'недеља_понедељак_уторак_среда_четвртак_петак_субота'.split('_'),
	    weekdaysShort: 'нед._пон._уто._сре._чет._пет._суб.'.split('_'),
	    weekdaysMin: 'не_по_ут_ср_че_пе_су'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm',
	        LLLL: 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar: {
	        sameDay: '[данас у] LT',
	        nextDay: '[сутра у] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[у] [недељу] [у] LT';
	                case 3:
	                    return '[у] [среду] [у] LT';
	                case 6:
	                    return '[у] [суботу] [у] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[у] dddd [у] LT';
	            }
	        },
	        lastDay  : '[јуче у] LT',
	        lastWeek : function () {
	            var lastWeekDays = [
	                '[прошле] [недеље] [у] LT',
	                '[прошлог] [понедељка] [у] LT',
	                '[прошлог] [уторка] [у] LT',
	                '[прошле] [среде] [у] LT',
	                '[прошлог] [четвртка] [у] LT',
	                '[прошлог] [петка] [у] LT',
	                '[прошле] [суботе] [у] LT'
	            ];
	            return lastWeekDays[this.day()];
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'за %s',
	        past   : 'пре %s',
	        s      : 'неколико секунди',
	        m      : translator.translate,
	        mm     : translator.translate,
	        h      : translator.translate,
	        hh     : translator.translate,
	        d      : 'дан',
	        dd     : translator.translate,
	        M      : 'месец',
	        MM     : translator.translate,
	        y      : 'годину',
	        yy     : translator.translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return srCyrl;

	})));


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Serbian [sr]
	//! author : Milan Janačković<milanjanackovic@gmail.com> : https://github.com/milan-j

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var translator = {
	    words: { //Different grammatical cases
	        m: ['jedan minut', 'jedne minute'],
	        mm: ['minut', 'minute', 'minuta'],
	        h: ['jedan sat', 'jednog sata'],
	        hh: ['sat', 'sata', 'sati'],
	        dd: ['dan', 'dana', 'dana'],
	        MM: ['mesec', 'meseca', 'meseci'],
	        yy: ['godina', 'godine', 'godina']
	    },
	    correctGrammaticalCase: function (number, wordKey) {
	        return number === 1 ? wordKey[0] : (number >= 2 && number <= 4 ? wordKey[1] : wordKey[2]);
	    },
	    translate: function (number, withoutSuffix, key) {
	        var wordKey = translator.words[key];
	        if (key.length === 1) {
	            return withoutSuffix ? wordKey[0] : wordKey[1];
	        } else {
	            return number + ' ' + translator.correctGrammaticalCase(number, wordKey);
	        }
	    }
	};

	var sr = moment.defineLocale('sr', {
	    months: 'januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar'.split('_'),
	    monthsShort: 'jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.'.split('_'),
	    monthsParseExact: true,
	    weekdays: 'nedelja_ponedeljak_utorak_sreda_četvrtak_petak_subota'.split('_'),
	    weekdaysShort: 'ned._pon._uto._sre._čet._pet._sub.'.split('_'),
	    weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat: {
	        LT: 'H:mm',
	        LTS : 'H:mm:ss',
	        L: 'DD.MM.YYYY',
	        LL: 'D. MMMM YYYY',
	        LLL: 'D. MMMM YYYY H:mm',
	        LLLL: 'dddd, D. MMMM YYYY H:mm'
	    },
	    calendar: {
	        sameDay: '[danas u] LT',
	        nextDay: '[sutra u] LT',
	        nextWeek: function () {
	            switch (this.day()) {
	                case 0:
	                    return '[u] [nedelju] [u] LT';
	                case 3:
	                    return '[u] [sredu] [u] LT';
	                case 6:
	                    return '[u] [subotu] [u] LT';
	                case 1:
	                case 2:
	                case 4:
	                case 5:
	                    return '[u] dddd [u] LT';
	            }
	        },
	        lastDay  : '[juče u] LT',
	        lastWeek : function () {
	            var lastWeekDays = [
	                '[prošle] [nedelje] [u] LT',
	                '[prošlog] [ponedeljka] [u] LT',
	                '[prošlog] [utorka] [u] LT',
	                '[prošle] [srede] [u] LT',
	                '[prošlog] [četvrtka] [u] LT',
	                '[prošlog] [petka] [u] LT',
	                '[prošle] [subote] [u] LT'
	            ];
	            return lastWeekDays[this.day()];
	        },
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'za %s',
	        past   : 'pre %s',
	        s      : 'nekoliko sekundi',
	        m      : translator.translate,
	        mm     : translator.translate,
	        h      : translator.translate,
	        hh     : translator.translate,
	        d      : 'dan',
	        dd     : translator.translate,
	        M      : 'mesec',
	        MM     : translator.translate,
	        y      : 'godinu',
	        yy     : translator.translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return sr;

	})));


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : siSwati [ss]
	//! author : Nicolai Davies<mail@nicolai.io> : https://github.com/nicolaidavies

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';



	var ss = moment.defineLocale('ss', {
	    months : "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split('_'),
	    monthsShort : 'Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo'.split('_'),
	    weekdays : 'Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo'.split('_'),
	    weekdaysShort : 'Lis_Umb_Lsb_Les_Lsi_Lsh_Umg'.split('_'),
	    weekdaysMin : 'Li_Us_Lb_Lt_Ls_Lh_Ug'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Namuhla nga] LT',
	        nextDay : '[Kusasa nga] LT',
	        nextWeek : 'dddd [nga] LT',
	        lastDay : '[Itolo nga] LT',
	        lastWeek : 'dddd [leliphelile] [nga] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'nga %s',
	        past : 'wenteka nga %s',
	        s : 'emizuzwana lomcane',
	        m : 'umzuzu',
	        mm : '%d emizuzu',
	        h : 'lihora',
	        hh : '%d emahora',
	        d : 'lilanga',
	        dd : '%d emalanga',
	        M : 'inyanga',
	        MM : '%d tinyanga',
	        y : 'umnyaka',
	        yy : '%d iminyaka'
	    },
	    meridiemParse: /ekuseni|emini|entsambama|ebusuku/,
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 11) {
	            return 'ekuseni';
	        } else if (hours < 15) {
	            return 'emini';
	        } else if (hours < 19) {
	            return 'entsambama';
	        } else {
	            return 'ebusuku';
	        }
	    },
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'ekuseni') {
	            return hour;
	        } else if (meridiem === 'emini') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === 'entsambama' || meridiem === 'ebusuku') {
	            if (hour === 0) {
	                return 0;
	            }
	            return hour + 12;
	        }
	    },
	    ordinalParse: /\d{1,2}/,
	    ordinal : '%d',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return ss;

	})));


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Swedish [sv]
	//! author : Jens Alm : https://github.com/ulmus

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var sv = moment.defineLocale('sv', {
	    months : 'januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december'.split('_'),
	    monthsShort : 'jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec'.split('_'),
	    weekdays : 'söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag'.split('_'),
	    weekdaysShort : 'sön_mån_tis_ons_tor_fre_lör'.split('_'),
	    weekdaysMin : 'sö_må_ti_on_to_fr_lö'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'YYYY-MM-DD',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY [kl.] HH:mm',
	        LLLL : 'dddd D MMMM YYYY [kl.] HH:mm',
	        lll : 'D MMM YYYY HH:mm',
	        llll : 'ddd D MMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Idag] LT',
	        nextDay: '[Imorgon] LT',
	        lastDay: '[Igår] LT',
	        nextWeek: '[På] dddd LT',
	        lastWeek: '[I] dddd[s] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'om %s',
	        past : 'för %s sedan',
	        s : 'några sekunder',
	        m : 'en minut',
	        mm : '%d minuter',
	        h : 'en timme',
	        hh : '%d timmar',
	        d : 'en dag',
	        dd : '%d dagar',
	        M : 'en månad',
	        MM : '%d månader',
	        y : 'ett år',
	        yy : '%d år'
	    },
	    ordinalParse: /\d{1,2}(e|a)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'e' :
	            (b === 1) ? 'a' :
	            (b === 2) ? 'a' :
	            (b === 3) ? 'e' : 'e';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return sv;

	})));


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Swahili [sw]
	//! author : Fahad Kassim : https://github.com/fadsel

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var sw = moment.defineLocale('sw', {
	    months : 'Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba'.split('_'),
	    monthsShort : 'Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des'.split('_'),
	    weekdays : 'Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi'.split('_'),
	    weekdaysShort : 'Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos'.split('_'),
	    weekdaysMin : 'J2_J3_J4_J5_Al_Ij_J1'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[leo saa] LT',
	        nextDay : '[kesho saa] LT',
	        nextWeek : '[wiki ijayo] dddd [saat] LT',
	        lastDay : '[jana] LT',
	        lastWeek : '[wiki iliyopita] dddd [saat] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s baadaye',
	        past : 'tokea %s',
	        s : 'hivi punde',
	        m : 'dakika moja',
	        mm : 'dakika %d',
	        h : 'saa limoja',
	        hh : 'masaa %d',
	        d : 'siku moja',
	        dd : 'masiku %d',
	        M : 'mwezi mmoja',
	        MM : 'miezi %d',
	        y : 'mwaka mmoja',
	        yy : 'miaka %d'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return sw;

	})));


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tamil [ta]
	//! author : Arjunkumar Krishnamoorthy : https://github.com/tk120404

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var symbolMap = {
	    '1': '௧',
	    '2': '௨',
	    '3': '௩',
	    '4': '௪',
	    '5': '௫',
	    '6': '௬',
	    '7': '௭',
	    '8': '௮',
	    '9': '௯',
	    '0': '௦'
	};
	var numberMap = {
	    '௧': '1',
	    '௨': '2',
	    '௩': '3',
	    '௪': '4',
	    '௫': '5',
	    '௬': '6',
	    '௭': '7',
	    '௮': '8',
	    '௯': '9',
	    '௦': '0'
	};

	var ta = moment.defineLocale('ta', {
	    months : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	    monthsShort : 'ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்'.split('_'),
	    weekdays : 'ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை'.split('_'),
	    weekdaysShort : 'ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி'.split('_'),
	    weekdaysMin : 'ஞா_தி_செ_பு_வி_வெ_ச'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, HH:mm',
	        LLLL : 'dddd, D MMMM YYYY, HH:mm'
	    },
	    calendar : {
	        sameDay : '[இன்று] LT',
	        nextDay : '[நாளை] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[நேற்று] LT',
	        lastWeek : '[கடந்த வாரம்] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s இல்',
	        past : '%s முன்',
	        s : 'ஒரு சில விநாடிகள்',
	        m : 'ஒரு நிமிடம்',
	        mm : '%d நிமிடங்கள்',
	        h : 'ஒரு மணி நேரம்',
	        hh : '%d மணி நேரம்',
	        d : 'ஒரு நாள்',
	        dd : '%d நாட்கள்',
	        M : 'ஒரு மாதம்',
	        MM : '%d மாதங்கள்',
	        y : 'ஒரு வருடம்',
	        yy : '%d ஆண்டுகள்'
	    },
	    ordinalParse: /\d{1,2}வது/,
	    ordinal : function (number) {
	        return number + 'வது';
	    },
	    preparse: function (string) {
	        return string.replace(/[௧௨௩௪௫௬௭௮௯௦]/g, function (match) {
	            return numberMap[match];
	        });
	    },
	    postformat: function (string) {
	        return string.replace(/\d/g, function (match) {
	            return symbolMap[match];
	        });
	    },
	    // refer http://ta.wikipedia.org/s/1er1
	    meridiemParse: /யாமம்|வைகறை|காலை|நண்பகல்|எற்பாடு|மாலை/,
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 2) {
	            return ' யாமம்';
	        } else if (hour < 6) {
	            return ' வைகறை';  // வைகறை
	        } else if (hour < 10) {
	            return ' காலை'; // காலை
	        } else if (hour < 14) {
	            return ' நண்பகல்'; // நண்பகல்
	        } else if (hour < 18) {
	            return ' எற்பாடு'; // எற்பாடு
	        } else if (hour < 22) {
	            return ' மாலை'; // மாலை
	        } else {
	            return ' யாமம்';
	        }
	    },
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'யாமம்') {
	            return hour < 2 ? hour : hour + 12;
	        } else if (meridiem === 'வைகறை' || meridiem === 'காலை') {
	            return hour;
	        } else if (meridiem === 'நண்பகல்') {
	            return hour >= 10 ? hour : hour + 12;
	        } else {
	            return hour + 12;
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return ta;

	})));


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Telugu [te]
	//! author : Krishna Chaitanya Thota : https://github.com/kcthota

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var te = moment.defineLocale('te', {
	    months : 'జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జూలై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్'.split('_'),
	    monthsShort : 'జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జూలై_ఆగ._సెప్._అక్టో._నవ._డిసె.'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం'.split('_'),
	    weekdaysShort : 'ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని'.split('_'),
	    weekdaysMin : 'ఆ_సో_మం_బు_గు_శు_శ'.split('_'),
	    longDateFormat : {
	        LT : 'A h:mm',
	        LTS : 'A h:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY, A h:mm',
	        LLLL : 'dddd, D MMMM YYYY, A h:mm'
	    },
	    calendar : {
	        sameDay : '[నేడు] LT',
	        nextDay : '[రేపు] LT',
	        nextWeek : 'dddd, LT',
	        lastDay : '[నిన్న] LT',
	        lastWeek : '[గత] dddd, LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s లో',
	        past : '%s క్రితం',
	        s : 'కొన్ని క్షణాలు',
	        m : 'ఒక నిమిషం',
	        mm : '%d నిమిషాలు',
	        h : 'ఒక గంట',
	        hh : '%d గంటలు',
	        d : 'ఒక రోజు',
	        dd : '%d రోజులు',
	        M : 'ఒక నెల',
	        MM : '%d నెలలు',
	        y : 'ఒక సంవత్సరం',
	        yy : '%d సంవత్సరాలు'
	    },
	    ordinalParse : /\d{1,2}వ/,
	    ordinal : '%dవ',
	    meridiemParse: /రాత్రి|ఉదయం|మధ్యాహ్నం|సాయంత్రం/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === 'రాత్రి') {
	            return hour < 4 ? hour : hour + 12;
	        } else if (meridiem === 'ఉదయం') {
	            return hour;
	        } else if (meridiem === 'మధ్యాహ్నం') {
	            return hour >= 10 ? hour : hour + 12;
	        } else if (meridiem === 'సాయంత్రం') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'రాత్రి';
	        } else if (hour < 10) {
	            return 'ఉదయం';
	        } else if (hour < 17) {
	            return 'మధ్యాహ్నం';
	        } else if (hour < 20) {
	            return 'సాయంత్రం';
	        } else {
	            return 'రాత్రి';
	        }
	    },
	    week : {
	        dow : 0, // Sunday is the first day of the week.
	        doy : 6  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return te;

	})));


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tetun Dili (East Timor) [tet]
	//! author : Joshua Brooks : https://github.com/joshbrooks
	//! author : Onorio De J. Afonso : https://github.com/marobo

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var tet = moment.defineLocale('tet', {
	    months : 'Janeiru_Fevereiru_Marsu_Abril_Maiu_Juniu_Juliu_Augustu_Setembru_Outubru_Novembru_Dezembru'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Aug_Set_Out_Nov_Dez'.split('_'),
	    weekdays : 'Domingu_Segunda_Tersa_Kuarta_Kinta_Sexta_Sabadu'.split('_'),
	    weekdaysShort : 'Dom_Seg_Ters_Kua_Kint_Sext_Sab'.split('_'),
	    weekdaysMin : 'Do_Seg_Te_Ku_Ki_Sex_Sa'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Ohin iha] LT',
	        nextDay: '[Aban iha] LT',
	        nextWeek: 'dddd [iha] LT',
	        lastDay: '[Horiseik iha] LT',
	        lastWeek: 'dddd [semana kotuk] [iha] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'iha %s',
	        past : '%s liuba',
	        s : 'minutu balun',
	        m : 'minutu ida',
	        mm : 'minutus %d',
	        h : 'horas ida',
	        hh : 'horas %d',
	        d : 'loron ida',
	        dd : 'loron %d',
	        M : 'fulan ida',
	        MM : 'fulan %d',
	        y : 'tinan ida',
	        yy : 'tinan %d'
	    },
	    ordinalParse: /\d{1,2}(st|nd|rd|th)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return tet;

	})));


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Thai [th]
	//! author : Kridsada Thanabulpong : https://github.com/sirn

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var th = moment.defineLocale('th', {
	    months : 'มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม'.split('_'),
	    monthsShort : 'ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.'.split('_'),
	    monthsParseExact: true,
	    weekdays : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์'.split('_'),
	    weekdaysShort : 'อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์'.split('_'), // yes, three characters difference
	    weekdaysMin : 'อา._จ._อ._พ._พฤ._ศ._ส.'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'H:mm',
	        LTS : 'H:mm:ss',
	        L : 'YYYY/MM/DD',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY เวลา H:mm',
	        LLLL : 'วันddddที่ D MMMM YYYY เวลา H:mm'
	    },
	    meridiemParse: /ก่อนเที่ยง|หลังเที่ยง/,
	    isPM: function (input) {
	        return input === 'หลังเที่ยง';
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 12) {
	            return 'ก่อนเที่ยง';
	        } else {
	            return 'หลังเที่ยง';
	        }
	    },
	    calendar : {
	        sameDay : '[วันนี้ เวลา] LT',
	        nextDay : '[พรุ่งนี้ เวลา] LT',
	        nextWeek : 'dddd[หน้า เวลา] LT',
	        lastDay : '[เมื่อวานนี้ เวลา] LT',
	        lastWeek : '[วัน]dddd[ที่แล้ว เวลา] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'อีก %s',
	        past : '%sที่แล้ว',
	        s : 'ไม่กี่วินาที',
	        m : '1 นาที',
	        mm : '%d นาที',
	        h : '1 ชั่วโมง',
	        hh : '%d ชั่วโมง',
	        d : '1 วัน',
	        dd : '%d วัน',
	        M : '1 เดือน',
	        MM : '%d เดือน',
	        y : '1 ปี',
	        yy : '%d ปี'
	    }
	});

	return th;

	})));


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Tagalog (Philippines) [tl-ph]
	//! author : Dan Hagman : https://github.com/hagmandan

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var tlPh = moment.defineLocale('tl-ph', {
	    months : 'Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre'.split('_'),
	    monthsShort : 'Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis'.split('_'),
	    weekdays : 'Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado'.split('_'),
	    weekdaysShort : 'Lin_Lun_Mar_Miy_Huw_Biy_Sab'.split('_'),
	    weekdaysMin : 'Li_Lu_Ma_Mi_Hu_Bi_Sab'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'MM/D/YYYY',
	        LL : 'MMMM D, YYYY',
	        LLL : 'MMMM D, YYYY HH:mm',
	        LLLL : 'dddd, MMMM DD, YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: 'LT [ngayong araw]',
	        nextDay: '[Bukas ng] LT',
	        nextWeek: 'LT [sa susunod na] dddd',
	        lastDay: 'LT [kahapon]',
	        lastWeek: 'LT [noong nakaraang] dddd',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'sa loob ng %s',
	        past : '%s ang nakalipas',
	        s : 'ilang segundo',
	        m : 'isang minuto',
	        mm : '%d minuto',
	        h : 'isang oras',
	        hh : '%d oras',
	        d : 'isang araw',
	        dd : '%d araw',
	        M : 'isang buwan',
	        MM : '%d buwan',
	        y : 'isang taon',
	        yy : '%d taon'
	    },
	    ordinalParse: /\d{1,2}/,
	    ordinal : function (number) {
	        return number;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return tlPh;

	})));


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Klingon [tlh]
	//! author : Dominika Kruk : https://github.com/amaranthrose

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var numbersNouns = 'pagh_wa’_cha’_wej_loS_vagh_jav_Soch_chorgh_Hut'.split('_');

	function translateFuture(output) {
	    var time = output;
	    time = (output.indexOf('jaj') !== -1) ?
	    time.slice(0, -3) + 'leS' :
	    (output.indexOf('jar') !== -1) ?
	    time.slice(0, -3) + 'waQ' :
	    (output.indexOf('DIS') !== -1) ?
	    time.slice(0, -3) + 'nem' :
	    time + ' pIq';
	    return time;
	}

	function translatePast(output) {
	    var time = output;
	    time = (output.indexOf('jaj') !== -1) ?
	    time.slice(0, -3) + 'Hu’' :
	    (output.indexOf('jar') !== -1) ?
	    time.slice(0, -3) + 'wen' :
	    (output.indexOf('DIS') !== -1) ?
	    time.slice(0, -3) + 'ben' :
	    time + ' ret';
	    return time;
	}

	function translate(number, withoutSuffix, string, isFuture) {
	    var numberNoun = numberAsNoun(number);
	    switch (string) {
	        case 'mm':
	            return numberNoun + ' tup';
	        case 'hh':
	            return numberNoun + ' rep';
	        case 'dd':
	            return numberNoun + ' jaj';
	        case 'MM':
	            return numberNoun + ' jar';
	        case 'yy':
	            return numberNoun + ' DIS';
	    }
	}

	function numberAsNoun(number) {
	    var hundred = Math.floor((number % 1000) / 100),
	    ten = Math.floor((number % 100) / 10),
	    one = number % 10,
	    word = '';
	    if (hundred > 0) {
	        word += numbersNouns[hundred] + 'vatlh';
	    }
	    if (ten > 0) {
	        word += ((word !== '') ? ' ' : '') + numbersNouns[ten] + 'maH';
	    }
	    if (one > 0) {
	        word += ((word !== '') ? ' ' : '') + numbersNouns[one];
	    }
	    return (word === '') ? 'pagh' : word;
	}

	var tlh = moment.defineLocale('tlh', {
	    months : 'tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’'.split('_'),
	    monthsShort : 'jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	    weekdaysShort : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	    weekdaysMin : 'lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[DaHjaj] LT',
	        nextDay: '[wa’leS] LT',
	        nextWeek: 'LLL',
	        lastDay: '[wa’Hu’] LT',
	        lastWeek: 'LLL',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : translateFuture,
	        past : translatePast,
	        s : 'puS lup',
	        m : 'wa’ tup',
	        mm : translate,
	        h : 'wa’ rep',
	        hh : translate,
	        d : 'wa’ jaj',
	        dd : translate,
	        M : 'wa’ jar',
	        MM : translate,
	        y : 'wa’ DIS',
	        yy : translate
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return tlh;

	})));


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Turkish [tr]
	//! authors : Erhan Gundogan : https://github.com/erhangundogan,
	//!           Burak Yiğit Kaya: https://github.com/BYK

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var suffixes = {
	    1: '\'inci',
	    5: '\'inci',
	    8: '\'inci',
	    70: '\'inci',
	    80: '\'inci',
	    2: '\'nci',
	    7: '\'nci',
	    20: '\'nci',
	    50: '\'nci',
	    3: '\'üncü',
	    4: '\'üncü',
	    100: '\'üncü',
	    6: '\'ncı',
	    9: '\'uncu',
	    10: '\'uncu',
	    30: '\'uncu',
	    60: '\'ıncı',
	    90: '\'ıncı'
	};

	var tr = moment.defineLocale('tr', {
	    months : 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
	    monthsShort : 'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'.split('_'),
	    weekdays : 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'),
	    weekdaysShort : 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'),
	    weekdaysMin : 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[bugün saat] LT',
	        nextDay : '[yarın saat] LT',
	        nextWeek : '[haftaya] dddd [saat] LT',
	        lastDay : '[dün] LT',
	        lastWeek : '[geçen hafta] dddd [saat] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : '%s sonra',
	        past : '%s önce',
	        s : 'birkaç saniye',
	        m : 'bir dakika',
	        mm : '%d dakika',
	        h : 'bir saat',
	        hh : '%d saat',
	        d : 'bir gün',
	        dd : '%d gün',
	        M : 'bir ay',
	        MM : '%d ay',
	        y : 'bir yıl',
	        yy : '%d yıl'
	    },
	    ordinalParse: /\d{1,2}'(inci|nci|üncü|ncı|uncu|ıncı)/,
	    ordinal : function (number) {
	        if (number === 0) {  // special case for zero
	            return number + '\'ıncı';
	        }
	        var a = number % 10,
	            b = number % 100 - a,
	            c = number >= 100 ? 100 : null;
	        return number + (suffixes[a] || suffixes[b] || suffixes[c]);
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return tr;

	})));


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Talossan [tzl]
	//! author : Robin van der Vliet : https://github.com/robin0van0der0v
	//! author : Iustì Canun

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	// After the year there should be a slash and the amount of years since December 26, 1979 in Roman numerals.
	// This is currently too difficult (maybe even impossible) to add.
	var tzl = moment.defineLocale('tzl', {
	    months : 'Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar'.split('_'),
	    monthsShort : 'Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec'.split('_'),
	    weekdays : 'Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi'.split('_'),
	    weekdaysShort : 'Súl_Lún_Mai_Már_Xhú_Vié_Sát'.split('_'),
	    weekdaysMin : 'Sú_Lú_Ma_Má_Xh_Vi_Sá'.split('_'),
	    longDateFormat : {
	        LT : 'HH.mm',
	        LTS : 'HH.mm.ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D. MMMM [dallas] YYYY',
	        LLL : 'D. MMMM [dallas] YYYY HH.mm',
	        LLLL : 'dddd, [li] D. MMMM [dallas] YYYY HH.mm'
	    },
	    meridiemParse: /d\'o|d\'a/i,
	    isPM : function (input) {
	        return 'd\'o' === input.toLowerCase();
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours > 11) {
	            return isLower ? 'd\'o' : 'D\'O';
	        } else {
	            return isLower ? 'd\'a' : 'D\'A';
	        }
	    },
	    calendar : {
	        sameDay : '[oxhi à] LT',
	        nextDay : '[demà à] LT',
	        nextWeek : 'dddd [à] LT',
	        lastDay : '[ieiri à] LT',
	        lastWeek : '[sür el] dddd [lasteu à] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'osprei %s',
	        past : 'ja%s',
	        s : processRelativeTime,
	        m : processRelativeTime,
	        mm : processRelativeTime,
	        h : processRelativeTime,
	        hh : processRelativeTime,
	        d : processRelativeTime,
	        dd : processRelativeTime,
	        M : processRelativeTime,
	        MM : processRelativeTime,
	        y : processRelativeTime,
	        yy : processRelativeTime
	    },
	    ordinalParse: /\d{1,2}\./,
	    ordinal : '%d.',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	function processRelativeTime(number, withoutSuffix, key, isFuture) {
	    var format = {
	        's': ['viensas secunds', '\'iensas secunds'],
	        'm': ['\'n míut', '\'iens míut'],
	        'mm': [number + ' míuts', '' + number + ' míuts'],
	        'h': ['\'n þora', '\'iensa þora'],
	        'hh': [number + ' þoras', '' + number + ' þoras'],
	        'd': ['\'n ziua', '\'iensa ziua'],
	        'dd': [number + ' ziuas', '' + number + ' ziuas'],
	        'M': ['\'n mes', '\'iens mes'],
	        'MM': [number + ' mesen', '' + number + ' mesen'],
	        'y': ['\'n ar', '\'iens ar'],
	        'yy': [number + ' ars', '' + number + ' ars']
	    };
	    return isFuture ? format[key][0] : (withoutSuffix ? format[key][0] : format[key][1]);
	}

	return tzl;

	})));


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Central Atlas Tamazight Latin [tzm-latn]
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var tzmLatn = moment.defineLocale('tzm-latn', {
	    months : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	    monthsShort : 'innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir'.split('_'),
	    weekdays : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	    weekdaysShort : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	    weekdaysMin : 'asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[asdkh g] LT',
	        nextDay: '[aska g] LT',
	        nextWeek: 'dddd [g] LT',
	        lastDay: '[assant g] LT',
	        lastWeek: 'dddd [g] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'dadkh s yan %s',
	        past : 'yan %s',
	        s : 'imik',
	        m : 'minuḍ',
	        mm : '%d minuḍ',
	        h : 'saɛa',
	        hh : '%d tassaɛin',
	        d : 'ass',
	        dd : '%d ossan',
	        M : 'ayowr',
	        MM : '%d iyyirn',
	        y : 'asgas',
	        yy : '%d isgasn'
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return tzmLatn;

	})));


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Central Atlas Tamazight [tzm]
	//! author : Abdel Said : https://github.com/abdelsaid

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var tzm = moment.defineLocale('tzm', {
	    months : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	    monthsShort : 'ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ'.split('_'),
	    weekdays : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	    weekdaysShort : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	    weekdaysMin : 'ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS: 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[ⴰⵙⴷⵅ ⴴ] LT',
	        nextDay: '[ⴰⵙⴽⴰ ⴴ] LT',
	        nextWeek: 'dddd [ⴴ] LT',
	        lastDay: '[ⴰⵚⴰⵏⵜ ⴴ] LT',
	        lastWeek: 'dddd [ⴴ] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s',
	        past : 'ⵢⴰⵏ %s',
	        s : 'ⵉⵎⵉⴽ',
	        m : 'ⵎⵉⵏⵓⴺ',
	        mm : '%d ⵎⵉⵏⵓⴺ',
	        h : 'ⵙⴰⵄⴰ',
	        hh : '%d ⵜⴰⵙⵙⴰⵄⵉⵏ',
	        d : 'ⴰⵙⵙ',
	        dd : '%d oⵙⵙⴰⵏ',
	        M : 'ⴰⵢoⵓⵔ',
	        MM : '%d ⵉⵢⵢⵉⵔⵏ',
	        y : 'ⴰⵙⴳⴰⵙ',
	        yy : '%d ⵉⵙⴳⴰⵙⵏ'
	    },
	    week : {
	        dow : 6, // Saturday is the first day of the week.
	        doy : 12  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return tzm;

	})));


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Ukrainian [uk]
	//! author : zemlanin : https://github.com/zemlanin
	//! Author : Menelion Elensúle : https://github.com/Oire

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	function plural(word, num) {
	    var forms = word.split('_');
	    return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
	}
	function relativeTimeWithPlural(number, withoutSuffix, key) {
	    var format = {
	        'mm': withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
	        'hh': withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
	        'dd': 'день_дні_днів',
	        'MM': 'місяць_місяці_місяців',
	        'yy': 'рік_роки_років'
	    };
	    if (key === 'm') {
	        return withoutSuffix ? 'хвилина' : 'хвилину';
	    }
	    else if (key === 'h') {
	        return withoutSuffix ? 'година' : 'годину';
	    }
	    else {
	        return number + ' ' + plural(format[key], +number);
	    }
	}
	function weekdaysCaseReplace(m, format) {
	    var weekdays = {
	        'nominative': 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
	        'accusative': 'неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу'.split('_'),
	        'genitive': 'неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи'.split('_')
	    },
	    nounCase = (/(\[[ВвУу]\]) ?dddd/).test(format) ?
	        'accusative' :
	        ((/\[?(?:минулої|наступної)? ?\] ?dddd/).test(format) ?
	            'genitive' :
	            'nominative');
	    return weekdays[nounCase][m.day()];
	}
	function processHoursFunction(str) {
	    return function () {
	        return str + 'о' + (this.hours() === 11 ? 'б' : '') + '] LT';
	    };
	}

	var uk = moment.defineLocale('uk', {
	    months : {
	        'format': 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_'),
	        'standalone': 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_')
	    },
	    monthsShort : 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
	    weekdays : weekdaysCaseReplace,
	    weekdaysShort : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	    weekdaysMin : 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD.MM.YYYY',
	        LL : 'D MMMM YYYY р.',
	        LLL : 'D MMMM YYYY р., HH:mm',
	        LLLL : 'dddd, D MMMM YYYY р., HH:mm'
	    },
	    calendar : {
	        sameDay: processHoursFunction('[Сьогодні '),
	        nextDay: processHoursFunction('[Завтра '),
	        lastDay: processHoursFunction('[Вчора '),
	        nextWeek: processHoursFunction('[У] dddd ['),
	        lastWeek: function () {
	            switch (this.day()) {
	                case 0:
	                case 3:
	                case 5:
	                case 6:
	                    return processHoursFunction('[Минулої] dddd [').call(this);
	                case 1:
	                case 2:
	                case 4:
	                    return processHoursFunction('[Минулого] dddd [').call(this);
	            }
	        },
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : 'за %s',
	        past : '%s тому',
	        s : 'декілька секунд',
	        m : relativeTimeWithPlural,
	        mm : relativeTimeWithPlural,
	        h : 'годину',
	        hh : relativeTimeWithPlural,
	        d : 'день',
	        dd : relativeTimeWithPlural,
	        M : 'місяць',
	        MM : relativeTimeWithPlural,
	        y : 'рік',
	        yy : relativeTimeWithPlural
	    },
	    // M. E.: those two are virtually unused but a user might want to implement them for his/her website for some reason
	    meridiemParse: /ночі|ранку|дня|вечора/,
	    isPM: function (input) {
	        return /^(дня|вечора)$/.test(input);
	    },
	    meridiem : function (hour, minute, isLower) {
	        if (hour < 4) {
	            return 'ночі';
	        } else if (hour < 12) {
	            return 'ранку';
	        } else if (hour < 17) {
	            return 'дня';
	        } else {
	            return 'вечора';
	        }
	    },
	    ordinalParse: /\d{1,2}-(й|го)/,
	    ordinal: function (number, period) {
	        switch (period) {
	            case 'M':
	            case 'd':
	            case 'DDD':
	            case 'w':
	            case 'W':
	                return number + '-й';
	            case 'D':
	                return number + '-го';
	            default:
	                return number;
	        }
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 1st is the first week of the year.
	    }
	});

	return uk;

	})));


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Uzbek [uz]
	//! author : Sardor Muminov : https://github.com/muminoff

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var uz = moment.defineLocale('uz', {
	    months : 'январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр'.split('_'),
	    monthsShort : 'янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек'.split('_'),
	    weekdays : 'Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба'.split('_'),
	    weekdaysShort : 'Якш_Душ_Сеш_Чор_Пай_Жум_Шан'.split('_'),
	    weekdaysMin : 'Як_Ду_Се_Чо_Па_Жу_Ша'.split('_'),
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'D MMMM YYYY, dddd HH:mm'
	    },
	    calendar : {
	        sameDay : '[Бугун соат] LT [да]',
	        nextDay : '[Эртага] LT [да]',
	        nextWeek : 'dddd [куни соат] LT [да]',
	        lastDay : '[Кеча соат] LT [да]',
	        lastWeek : '[Утган] dddd [куни соат] LT [да]',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'Якин %s ичида',
	        past : 'Бир неча %s олдин',
	        s : 'фурсат',
	        m : 'бир дакика',
	        mm : '%d дакика',
	        h : 'бир соат',
	        hh : '%d соат',
	        d : 'бир кун',
	        dd : '%d кун',
	        M : 'бир ой',
	        MM : '%d ой',
	        y : 'бир йил',
	        yy : '%d йил'
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 7  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return uz;

	})));


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Vietnamese [vi]
	//! author : Bang Nguyen : https://github.com/bangnk

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var vi = moment.defineLocale('vi', {
	    months : 'tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'),
	    monthsShort : 'Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'),
	    weekdaysShort : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	    weekdaysMin : 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
	    weekdaysParseExact : true,
	    meridiemParse: /sa|ch/i,
	    isPM : function (input) {
	        return /^ch$/i.test(input);
	    },
	    meridiem : function (hours, minutes, isLower) {
	        if (hours < 12) {
	            return isLower ? 'sa' : 'SA';
	        } else {
	            return isLower ? 'ch' : 'CH';
	        }
	    },
	    longDateFormat : {
	        LT : 'HH:mm',
	        LTS : 'HH:mm:ss',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM [năm] YYYY',
	        LLL : 'D MMMM [năm] YYYY HH:mm',
	        LLLL : 'dddd, D MMMM [năm] YYYY HH:mm',
	        l : 'DD/M/YYYY',
	        ll : 'D MMM YYYY',
	        lll : 'D MMM YYYY HH:mm',
	        llll : 'ddd, D MMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay: '[Hôm nay lúc] LT',
	        nextDay: '[Ngày mai lúc] LT',
	        nextWeek: 'dddd [tuần tới lúc] LT',
	        lastDay: '[Hôm qua lúc] LT',
	        lastWeek: 'dddd [tuần rồi lúc] LT',
	        sameElse: 'L'
	    },
	    relativeTime : {
	        future : '%s tới',
	        past : '%s trước',
	        s : 'vài giây',
	        m : 'một phút',
	        mm : '%d phút',
	        h : 'một giờ',
	        hh : '%d giờ',
	        d : 'một ngày',
	        dd : '%d ngày',
	        M : 'một tháng',
	        MM : '%d tháng',
	        y : 'một năm',
	        yy : '%d năm'
	    },
	    ordinalParse: /\d{1,2}/,
	    ordinal : function (number) {
	        return number;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return vi;

	})));


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Pseudo [x-pseudo]
	//! author : Andrew Hood : https://github.com/andrewhood125

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var xPseudo = moment.defineLocale('x-pseudo', {
	    months : 'J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér'.split('_'),
	    monthsShort : 'J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc'.split('_'),
	    monthsParseExact : true,
	    weekdays : 'S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý'.split('_'),
	    weekdaysShort : 'S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát'.split('_'),
	    weekdaysMin : 'S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá'.split('_'),
	    weekdaysParseExact : true,
	    longDateFormat : {
	        LT : 'HH:mm',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY HH:mm',
	        LLLL : 'dddd, D MMMM YYYY HH:mm'
	    },
	    calendar : {
	        sameDay : '[T~ódá~ý át] LT',
	        nextDay : '[T~ómó~rró~w át] LT',
	        nextWeek : 'dddd [át] LT',
	        lastDay : '[Ý~ést~érdá~ý át] LT',
	        lastWeek : '[L~ást] dddd [át] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'í~ñ %s',
	        past : '%s á~gó',
	        s : 'á ~féw ~sécó~ñds',
	        m : 'á ~míñ~úté',
	        mm : '%d m~íñú~tés',
	        h : 'á~ñ hó~úr',
	        hh : '%d h~óúrs',
	        d : 'á ~dáý',
	        dd : '%d d~áýs',
	        M : 'á ~móñ~th',
	        MM : '%d m~óñt~hs',
	        y : 'á ~ýéár',
	        yy : '%d ý~éárs'
	    },
	    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
	    ordinal : function (number) {
	        var b = number % 10,
	            output = (~~(number % 100 / 10) === 1) ? 'th' :
	            (b === 1) ? 'st' :
	            (b === 2) ? 'nd' :
	            (b === 3) ? 'rd' : 'th';
	        return number + output;
	    },
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return xPseudo;

	})));


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Yoruba Nigeria [yo]
	//! author : Atolagbe Abisoye : https://github.com/andela-batolagbe

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var yo = moment.defineLocale('yo', {
	    months : 'Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀'.split('_'),
	    monthsShort : 'Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀'.split('_'),
	    weekdays : 'Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta'.split('_'),
	    weekdaysShort : 'Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá'.split('_'),
	    weekdaysMin : 'Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb'.split('_'),
	    longDateFormat : {
	        LT : 'h:mm A',
	        LTS : 'h:mm:ss A',
	        L : 'DD/MM/YYYY',
	        LL : 'D MMMM YYYY',
	        LLL : 'D MMMM YYYY h:mm A',
	        LLLL : 'dddd, D MMMM YYYY h:mm A'
	    },
	    calendar : {
	        sameDay : '[Ònì ni] LT',
	        nextDay : '[Ọ̀la ni] LT',
	        nextWeek : 'dddd [Ọsẹ̀ tón\'bọ] [ni] LT',
	        lastDay : '[Àna ni] LT',
	        lastWeek : 'dddd [Ọsẹ̀ tólọ́] [ni] LT',
	        sameElse : 'L'
	    },
	    relativeTime : {
	        future : 'ní %s',
	        past : '%s kọjá',
	        s : 'ìsẹjú aayá die',
	        m : 'ìsẹjú kan',
	        mm : 'ìsẹjú %d',
	        h : 'wákati kan',
	        hh : 'wákati %d',
	        d : 'ọjọ́ kan',
	        dd : 'ọjọ́ %d',
	        M : 'osù kan',
	        MM : 'osù %d',
	        y : 'ọdún kan',
	        yy : 'ọdún %d'
	    },
	    ordinalParse : /ọjọ́\s\d{1,2}/,
	    ordinal : 'ọjọ́ %d',
	    week : {
	        dow : 1, // Monday is the first day of the week.
	        doy : 4 // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return yo;

	})));


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (China) [zh-cn]
	//! author : suupic : https://github.com/suupic
	//! author : Zeno Zeng : https://github.com/zenozeng

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var zhCn = moment.defineLocale('zh-cn', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'Ah点mm分',
	        LTS : 'Ah点m分s秒',
	        L : 'YYYY-MM-DD',
	        LL : 'YYYY年MMMD日',
	        LLL : 'YYYY年MMMD日Ah点mm分',
	        LLLL : 'YYYY年MMMD日ddddAh点mm分',
	        l : 'YYYY-MM-DD',
	        ll : 'YYYY年MMMD日',
	        lll : 'YYYY年MMMD日Ah点mm分',
	        llll : 'YYYY年MMMD日ddddAh点mm分'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour: function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' ||
	                meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        } else {
	            // '中午'
	            return hour >= 11 ? hour : hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : function () {
	            return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
	        },
	        nextDay : function () {
	            return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
	        },
	        lastDay : function () {
	            return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
	        },
	        nextWeek : function () {
	            var startOfWeek, prefix;
	            startOfWeek = moment().startOf('week');
	            prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
	            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	        },
	        lastWeek : function () {
	            var startOfWeek, prefix;
	            startOfWeek = moment().startOf('week');
	            prefix = this.unix() < startOfWeek.unix()  ? '[上]' : '[本]';
	            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
	        },
	        sameElse : 'LL'
	    },
	    ordinalParse: /\d{1,2}(日|月|周)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd':
	            case 'D':
	            case 'DDD':
	                return number + '日';
	            case 'M':
	                return number + '月';
	            case 'w':
	            case 'W':
	                return number + '周';
	            default:
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s内',
	        past : '%s前',
	        s : '几秒',
	        m : '1 分钟',
	        mm : '%d 分钟',
	        h : '1 小时',
	        hh : '%d 小时',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 个月',
	        MM : '%d 个月',
	        y : '1 年',
	        yy : '%d 年'
	    },
	    week : {
	        // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
	        dow : 1, // Monday is the first day of the week.
	        doy : 4  // The week that contains Jan 4th is the first week of the year.
	    }
	});

	return zhCn;

	})));


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (Hong Kong) [zh-hk]
	//! author : Ben : https://github.com/ben-lin
	//! author : Chris Lam : https://github.com/hehachris
	//! author : Konstantin : https://github.com/skfd

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var zhHk = moment.defineLocale('zh-hk', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'Ah點mm分',
	        LTS : 'Ah點m分s秒',
	        L : 'YYYY年MMMD日',
	        LL : 'YYYY年MMMD日',
	        LLL : 'YYYY年MMMD日Ah點mm分',
	        LLLL : 'YYYY年MMMD日ddddAh點mm分',
	        l : 'YYYY年MMMD日',
	        ll : 'YYYY年MMMD日',
	        lll : 'YYYY年MMMD日Ah點mm分',
	        llll : 'YYYY年MMMD日ddddAh點mm分'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '中午') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : '[今天]LT',
	        nextDay : '[明天]LT',
	        nextWeek : '[下]ddddLT',
	        lastDay : '[昨天]LT',
	        lastWeek : '[上]ddddLT',
	        sameElse : 'L'
	    },
	    ordinalParse: /\d{1,2}(日|月|週)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s內',
	        past : '%s前',
	        s : '幾秒',
	        m : '1 分鐘',
	        mm : '%d 分鐘',
	        h : '1 小時',
	        hh : '%d 小時',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 個月',
	        MM : '%d 個月',
	        y : '1 年',
	        yy : '%d 年'
	    }
	});

	return zhHk;

	})));


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	//! moment.js locale configuration
	//! locale : Chinese (Taiwan) [zh-tw]
	//! author : Ben : https://github.com/ben-lin
	//! author : Chris Lam : https://github.com/hehachris

	;(function (global, factory) {
	    true ? factory(__webpack_require__(1)) :
	   typeof define === 'function' && define.amd ? define(['../moment'], factory) :
	   factory(global.moment)
	}(this, (function (moment) { 'use strict';


	var zhTw = moment.defineLocale('zh-tw', {
	    months : '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	    monthsShort : '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	    weekdays : '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	    weekdaysShort : '週日_週一_週二_週三_週四_週五_週六'.split('_'),
	    weekdaysMin : '日_一_二_三_四_五_六'.split('_'),
	    longDateFormat : {
	        LT : 'Ah點mm分',
	        LTS : 'Ah點m分s秒',
	        L : 'YYYY年MMMD日',
	        LL : 'YYYY年MMMD日',
	        LLL : 'YYYY年MMMD日Ah點mm分',
	        LLLL : 'YYYY年MMMD日ddddAh點mm分',
	        l : 'YYYY年MMMD日',
	        ll : 'YYYY年MMMD日',
	        lll : 'YYYY年MMMD日Ah點mm分',
	        llll : 'YYYY年MMMD日ddddAh點mm分'
	    },
	    meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	    meridiemHour : function (hour, meridiem) {
	        if (hour === 12) {
	            hour = 0;
	        }
	        if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
	            return hour;
	        } else if (meridiem === '中午') {
	            return hour >= 11 ? hour : hour + 12;
	        } else if (meridiem === '下午' || meridiem === '晚上') {
	            return hour + 12;
	        }
	    },
	    meridiem : function (hour, minute, isLower) {
	        var hm = hour * 100 + minute;
	        if (hm < 600) {
	            return '凌晨';
	        } else if (hm < 900) {
	            return '早上';
	        } else if (hm < 1130) {
	            return '上午';
	        } else if (hm < 1230) {
	            return '中午';
	        } else if (hm < 1800) {
	            return '下午';
	        } else {
	            return '晚上';
	        }
	    },
	    calendar : {
	        sameDay : '[今天]LT',
	        nextDay : '[明天]LT',
	        nextWeek : '[下]ddddLT',
	        lastDay : '[昨天]LT',
	        lastWeek : '[上]ddddLT',
	        sameElse : 'L'
	    },
	    ordinalParse: /\d{1,2}(日|月|週)/,
	    ordinal : function (number, period) {
	        switch (period) {
	            case 'd' :
	            case 'D' :
	            case 'DDD' :
	                return number + '日';
	            case 'M' :
	                return number + '月';
	            case 'w' :
	            case 'W' :
	                return number + '週';
	            default :
	                return number;
	        }
	    },
	    relativeTime : {
	        future : '%s內',
	        past : '%s前',
	        s : '幾秒',
	        m : '1 分鐘',
	        mm : '%d 分鐘',
	        h : '1 小時',
	        hh : '%d 小時',
	        d : '1 天',
	        dd : '%d 天',
	        M : '1 個月',
	        MM : '%d 個月',
	        y : '1 年',
	        yy : '%d 年'
	    }
	});

	return zhTw;

	})));


/***/ },
/* 111 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(111)))

/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without losing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	"use strict";

	var keyOf = function (oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};

	module.exports = keyOf;

/***/ },
/* 114 */
/***/ function(module, exports) {

	later = function() {
	  "use strict";
	  var later = {
	    version: "1.2.0"
	  };
	  if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function(searchElement) {
	      "use strict";
	      if (this == null) {
	        throw new TypeError();
	      }
	      var t = Object(this);
	      var len = t.length >>> 0;
	      if (len === 0) {
	        return -1;
	      }
	      var n = 0;
	      if (arguments.length > 1) {
	        n = Number(arguments[1]);
	        if (n != n) {
	          n = 0;
	        } else if (n != 0 && n != Infinity && n != -Infinity) {
	          n = (n > 0 || -1) * Math.floor(Math.abs(n));
	        }
	      }
	      if (n >= len) {
	        return -1;
	      }
	      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
	      for (;k < len; k++) {
	        if (k in t && t[k] === searchElement) {
	          return k;
	        }
	      }
	      return -1;
	    };
	  }
	  if (!String.prototype.trim) {
	    String.prototype.trim = function() {
	      return this.replace(/^\s+|\s+$/g, "");
	    };
	  }
	  later.array = {};
	  later.array.sort = function(arr, zeroIsLast) {
	    arr.sort(function(a, b) {
	      return +a - +b;
	    });
	    if (zeroIsLast && arr[0] === 0) {
	      arr.push(arr.shift());
	    }
	  };
	  later.array.next = function(val, values, extent) {
	    var cur, zeroIsLargest = extent[0] !== 0, nextIdx = 0;
	    for (var i = values.length - 1; i > -1; --i) {
	      cur = values[i];
	      if (cur === val) {
	        return cur;
	      }
	      if (cur > val || cur === 0 && zeroIsLargest && extent[1] > val) {
	        nextIdx = i;
	        continue;
	      }
	      break;
	    }
	    return values[nextIdx];
	  };
	  later.array.nextInvalid = function(val, values, extent) {
	    var min = extent[0], max = extent[1], len = values.length, zeroVal = values[len - 1] === 0 && min !== 0 ? max : 0, next = val, i = values.indexOf(val), start = next;
	    while (next === (values[i] || zeroVal)) {
	      next++;
	      if (next > max) {
	        next = min;
	      }
	      i++;
	      if (i === len) {
	        i = 0;
	      }
	      if (next === start) {
	        return undefined;
	      }
	    }
	    return next;
	  };
	  later.array.prev = function(val, values, extent) {
	    var cur, len = values.length, zeroIsLargest = extent[0] !== 0, prevIdx = len - 1;
	    for (var i = 0; i < len; i++) {
	      cur = values[i];
	      if (cur === val) {
	        return cur;
	      }
	      if (cur < val || cur === 0 && zeroIsLargest && extent[1] < val) {
	        prevIdx = i;
	        continue;
	      }
	      break;
	    }
	    return values[prevIdx];
	  };
	  later.array.prevInvalid = function(val, values, extent) {
	    var min = extent[0], max = extent[1], len = values.length, zeroVal = values[len - 1] === 0 && min !== 0 ? max : 0, next = val, i = values.indexOf(val), start = next;
	    while (next === (values[i] || zeroVal)) {
	      next--;
	      if (next < min) {
	        next = max;
	      }
	      i--;
	      if (i === -1) {
	        i = len - 1;
	      }
	      if (next === start) {
	        return undefined;
	      }
	    }
	    return next;
	  };
	  later.day = later.D = {
	    name: "day",
	    range: 86400,
	    val: function(d) {
	      return d.D || (d.D = later.date.getDate.call(d));
	    },
	    isValid: function(d, val) {
	      return later.D.val(d) === (val || later.D.extent(d)[1]);
	    },
	    extent: function(d) {
	      if (d.DExtent) return d.DExtent;
	      var month = later.M.val(d), max = later.DAYS_IN_MONTH[month - 1];
	      if (month === 2 && later.dy.extent(d)[1] === 366) {
	        max = max + 1;
	      }
	      return d.DExtent = [ 1, max ];
	    },
	    start: function(d) {
	      return d.DStart || (d.DStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d)));
	    },
	    end: function(d) {
	      return d.DEnd || (d.DEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d)));
	    },
	    next: function(d, val) {
	      val = val > later.D.extent(d)[1] ? 1 : val;
	      var month = later.date.nextRollover(d, val, later.D, later.M), DMax = later.D.extent(month)[1];
	      val = val > DMax ? 1 : val || DMax;
	      return later.date.next(later.Y.val(month), later.M.val(month), val);
	    },
	    prev: function(d, val) {
	      var month = later.date.prevRollover(d, val, later.D, later.M), DMax = later.D.extent(month)[1];
	      return later.date.prev(later.Y.val(month), later.M.val(month), val > DMax ? DMax : val || DMax);
	    }
	  };
	  later.dayOfWeekCount = later.dc = {
	    name: "day of week count",
	    range: 604800,
	    val: function(d) {
	      return d.dc || (d.dc = Math.floor((later.D.val(d) - 1) / 7) + 1);
	    },
	    isValid: function(d, val) {
	      return later.dc.val(d) === val || val === 0 && later.D.val(d) > later.D.extent(d)[1] - 7;
	    },
	    extent: function(d) {
	      return d.dcExtent || (d.dcExtent = [ 1, Math.ceil(later.D.extent(d)[1] / 7) ]);
	    },
	    start: function(d) {
	      return d.dcStart || (d.dcStart = later.date.next(later.Y.val(d), later.M.val(d), Math.max(1, (later.dc.val(d) - 1) * 7 + 1 || 1)));
	    },
	    end: function(d) {
	      return d.dcEnd || (d.dcEnd = later.date.prev(later.Y.val(d), later.M.val(d), Math.min(later.dc.val(d) * 7, later.D.extent(d)[1])));
	    },
	    next: function(d, val) {
	      val = val > later.dc.extent(d)[1] ? 1 : val;
	      var month = later.date.nextRollover(d, val, later.dc, later.M), dcMax = later.dc.extent(month)[1];
	      val = val > dcMax ? 1 : val;
	      var next = later.date.next(later.Y.val(month), later.M.val(month), val === 0 ? later.D.extent(month)[1] - 6 : 1 + 7 * (val - 1));
	      if (next.getTime() <= d.getTime()) {
	        month = later.M.next(d, later.M.val(d) + 1);
	        return later.date.next(later.Y.val(month), later.M.val(month), val === 0 ? later.D.extent(month)[1] - 6 : 1 + 7 * (val - 1));
	      }
	      return next;
	    },
	    prev: function(d, val) {
	      var month = later.date.prevRollover(d, val, later.dc, later.M), dcMax = later.dc.extent(month)[1];
	      val = val > dcMax ? dcMax : val || dcMax;
	      return later.dc.end(later.date.prev(later.Y.val(month), later.M.val(month), 1 + 7 * (val - 1)));
	    }
	  };
	  later.dayOfWeek = later.dw = later.d = {
	    name: "day of week",
	    range: 86400,
	    val: function(d) {
	      return d.dw || (d.dw = later.date.getDay.call(d) + 1);
	    },
	    isValid: function(d, val) {
	      return later.dw.val(d) === (val || 7);
	    },
	    extent: function() {
	      return [ 1, 7 ];
	    },
	    start: function(d) {
	      return later.D.start(d);
	    },
	    end: function(d) {
	      return later.D.end(d);
	    },
	    next: function(d, val) {
	      val = val > 7 ? 1 : val || 7;
	      return later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val - later.dw.val(d)) + (val <= later.dw.val(d) ? 7 : 0));
	    },
	    prev: function(d, val) {
	      val = val > 7 ? 7 : val || 7;
	      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d) + (val - later.dw.val(d)) + (val >= later.dw.val(d) ? -7 : 0));
	    }
	  };
	  later.dayOfYear = later.dy = {
	    name: "day of year",
	    range: 86400,
	    val: function(d) {
	      return d.dy || (d.dy = Math.ceil(1 + (later.D.start(d).getTime() - later.Y.start(d).getTime()) / later.DAY));
	    },
	    isValid: function(d, val) {
	      return later.dy.val(d) === (val || later.dy.extent(d)[1]);
	    },
	    extent: function(d) {
	      var year = later.Y.val(d);
	      return d.dyExtent || (d.dyExtent = [ 1, year % 4 ? 365 : 366 ]);
	    },
	    start: function(d) {
	      return later.D.start(d);
	    },
	    end: function(d) {
	      return later.D.end(d);
	    },
	    next: function(d, val) {
	      val = val > later.dy.extent(d)[1] ? 1 : val;
	      var year = later.date.nextRollover(d, val, later.dy, later.Y), dyMax = later.dy.extent(year)[1];
	      val = val > dyMax ? 1 : val || dyMax;
	      return later.date.next(later.Y.val(year), later.M.val(year), val);
	    },
	    prev: function(d, val) {
	      var year = later.date.prevRollover(d, val, later.dy, later.Y), dyMax = later.dy.extent(year)[1];
	      val = val > dyMax ? dyMax : val || dyMax;
	      return later.date.prev(later.Y.val(year), later.M.val(year), val);
	    }
	  };
	  later.hour = later.h = {
	    name: "hour",
	    range: 3600,
	    val: function(d) {
	      return d.h || (d.h = later.date.getHour.call(d));
	    },
	    isValid: function(d, val) {
	      return later.h.val(d) === val;
	    },
	    extent: function() {
	      return [ 0, 23 ];
	    },
	    start: function(d) {
	      return d.hStart || (d.hStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d)));
	    },
	    end: function(d) {
	      return d.hEnd || (d.hEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d)));
	    },
	    next: function(d, val) {
	      val = val > 23 ? 0 : val;
	      var next = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val <= later.h.val(d) ? 1 : 0), val);
	      if (!later.date.isUTC && next.getTime() <= d.getTime()) {
	        next = later.date.next(later.Y.val(next), later.M.val(next), later.D.val(next), val + 1);
	      }
	      return next;
	    },
	    prev: function(d, val) {
	      val = val > 23 ? 23 : val;
	      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d) + (val >= later.h.val(d) ? -1 : 0), val);
	    }
	  };
	  later.minute = later.m = {
	    name: "minute",
	    range: 60,
	    val: function(d) {
	      return d.m || (d.m = later.date.getMin.call(d));
	    },
	    isValid: function(d, val) {
	      return later.m.val(d) === val;
	    },
	    extent: function(d) {
	      return [ 0, 59 ];
	    },
	    start: function(d) {
	      return d.mStart || (d.mStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d), later.m.val(d)));
	    },
	    end: function(d) {
	      return d.mEnd || (d.mEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d), later.m.val(d)));
	    },
	    next: function(d, val) {
	      var m = later.m.val(d), s = later.s.val(d), inc = val > 59 ? 60 - m : val <= m ? 60 - m + val : val - m, next = new Date(d.getTime() + inc * later.MIN - s * later.SEC);
	      if (!later.date.isUTC && next.getTime() <= d.getTime()) {
	        next = new Date(d.getTime() + (inc + 120) * later.MIN - s * later.SEC);
	      }
	      return next;
	    },
	    prev: function(d, val) {
	      val = val > 59 ? 59 : val;
	      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d) + (val >= later.m.val(d) ? -1 : 0), val);
	    }
	  };
	  later.month = later.M = {
	    name: "month",
	    range: 2629740,
	    val: function(d) {
	      return d.M || (d.M = later.date.getMonth.call(d) + 1);
	    },
	    isValid: function(d, val) {
	      return later.M.val(d) === (val || 12);
	    },
	    extent: function() {
	      return [ 1, 12 ];
	    },
	    start: function(d) {
	      return d.MStart || (d.MStart = later.date.next(later.Y.val(d), later.M.val(d)));
	    },
	    end: function(d) {
	      return d.MEnd || (d.MEnd = later.date.prev(later.Y.val(d), later.M.val(d)));
	    },
	    next: function(d, val) {
	      val = val > 12 ? 1 : val || 12;
	      return later.date.next(later.Y.val(d) + (val > later.M.val(d) ? 0 : 1), val);
	    },
	    prev: function(d, val) {
	      val = val > 12 ? 12 : val || 12;
	      return later.date.prev(later.Y.val(d) - (val >= later.M.val(d) ? 1 : 0), val);
	    }
	  };
	  later.second = later.s = {
	    name: "second",
	    range: 1,
	    val: function(d) {
	      return d.s || (d.s = later.date.getSec.call(d));
	    },
	    isValid: function(d, val) {
	      return later.s.val(d) === val;
	    },
	    extent: function() {
	      return [ 0, 59 ];
	    },
	    start: function(d) {
	      return d;
	    },
	    end: function(d) {
	      return d;
	    },
	    next: function(d, val) {
	      var s = later.s.val(d), inc = val > 59 ? 60 - s : val <= s ? 60 - s + val : val - s, next = new Date(d.getTime() + inc * later.SEC);
	      if (!later.date.isUTC && next.getTime() <= d.getTime()) {
	        next = new Date(d.getTime() + (inc + 7200) * later.SEC);
	      }
	      return next;
	    },
	    prev: function(d, val, cache) {
	      val = val > 59 ? 59 : val;
	      return later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d), later.h.val(d), later.m.val(d) + (val >= later.s.val(d) ? -1 : 0), val);
	    }
	  };
	  later.time = later.t = {
	    name: "time",
	    range: 1,
	    val: function(d) {
	      return d.t || (d.t = later.h.val(d) * 3600 + later.m.val(d) * 60 + later.s.val(d));
	    },
	    isValid: function(d, val) {
	      return later.t.val(d) === val;
	    },
	    extent: function() {
	      return [ 0, 86399 ];
	    },
	    start: function(d) {
	      return d;
	    },
	    end: function(d) {
	      return d;
	    },
	    next: function(d, val) {
	      val = val > 86399 ? 0 : val;
	      var next = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val <= later.t.val(d) ? 1 : 0), 0, 0, val);
	      if (!later.date.isUTC && next.getTime() < d.getTime()) {
	        next = later.date.next(later.Y.val(next), later.M.val(next), later.D.val(next), later.h.val(next), later.m.val(next), val + 7200);
	      }
	      return next;
	    },
	    prev: function(d, val) {
	      val = val > 86399 ? 86399 : val;
	      return later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) + (val >= later.t.val(d) ? -1 : 0), 0, 0, val);
	    }
	  };
	  later.weekOfMonth = later.wm = {
	    name: "week of month",
	    range: 604800,
	    val: function(d) {
	      return d.wm || (d.wm = (later.D.val(d) + (later.dw.val(later.M.start(d)) - 1) + (7 - later.dw.val(d))) / 7);
	    },
	    isValid: function(d, val) {
	      return later.wm.val(d) === (val || later.wm.extent(d)[1]);
	    },
	    extent: function(d) {
	      return d.wmExtent || (d.wmExtent = [ 1, (later.D.extent(d)[1] + (later.dw.val(later.M.start(d)) - 1) + (7 - later.dw.val(later.M.end(d)))) / 7 ]);
	    },
	    start: function(d) {
	      return d.wmStart || (d.wmStart = later.date.next(later.Y.val(d), later.M.val(d), Math.max(later.D.val(d) - later.dw.val(d) + 1, 1)));
	    },
	    end: function(d) {
	      return d.wmEnd || (d.wmEnd = later.date.prev(later.Y.val(d), later.M.val(d), Math.min(later.D.val(d) + (7 - later.dw.val(d)), later.D.extent(d)[1])));
	    },
	    next: function(d, val) {
	      val = val > later.wm.extent(d)[1] ? 1 : val;
	      var month = later.date.nextRollover(d, val, later.wm, later.M), wmMax = later.wm.extent(month)[1];
	      val = val > wmMax ? 1 : val || wmMax;
	      return later.date.next(later.Y.val(month), later.M.val(month), Math.max(1, (val - 1) * 7 - (later.dw.val(month) - 2)));
	    },
	    prev: function(d, val) {
	      var month = later.date.prevRollover(d, val, later.wm, later.M), wmMax = later.wm.extent(month)[1];
	      val = val > wmMax ? wmMax : val || wmMax;
	      return later.wm.end(later.date.next(later.Y.val(month), later.M.val(month), Math.max(1, (val - 1) * 7 - (later.dw.val(month) - 2))));
	    }
	  };
	  later.weekOfYear = later.wy = {
	    name: "week of year (ISO)",
	    range: 604800,
	    val: function(d) {
	      if (d.wy) return d.wy;
	      var wThur = later.dw.next(later.wy.start(d), 5), YThur = later.dw.next(later.Y.prev(wThur, later.Y.val(wThur) - 1), 5);
	      return d.wy = 1 + Math.ceil((wThur.getTime() - YThur.getTime()) / later.WEEK);
	    },
	    isValid: function(d, val) {
	      return later.wy.val(d) === (val || later.wy.extent(d)[1]);
	    },
	    extent: function(d) {
	      if (d.wyExtent) return d.wyExtent;
	      var year = later.dw.next(later.wy.start(d), 5), dwFirst = later.dw.val(later.Y.start(year)), dwLast = later.dw.val(later.Y.end(year));
	      return d.wyExtent = [ 1, dwFirst === 5 || dwLast === 5 ? 53 : 52 ];
	    },
	    start: function(d) {
	      return d.wyStart || (d.wyStart = later.date.next(later.Y.val(d), later.M.val(d), later.D.val(d) - (later.dw.val(d) > 1 ? later.dw.val(d) - 2 : 6)));
	    },
	    end: function(d) {
	      return d.wyEnd || (d.wyEnd = later.date.prev(later.Y.val(d), later.M.val(d), later.D.val(d) + (later.dw.val(d) > 1 ? 8 - later.dw.val(d) : 0)));
	    },
	    next: function(d, val) {
	      val = val > later.wy.extent(d)[1] ? 1 : val;
	      var wyThur = later.dw.next(later.wy.start(d), 5), year = later.date.nextRollover(wyThur, val, later.wy, later.Y);
	      if (later.wy.val(year) !== 1) {
	        year = later.dw.next(year, 2);
	      }
	      var wyMax = later.wy.extent(year)[1], wyStart = later.wy.start(year);
	      val = val > wyMax ? 1 : val || wyMax;
	      return later.date.next(later.Y.val(wyStart), later.M.val(wyStart), later.D.val(wyStart) + 7 * (val - 1));
	    },
	    prev: function(d, val) {
	      var wyThur = later.dw.next(later.wy.start(d), 5), year = later.date.prevRollover(wyThur, val, later.wy, later.Y);
	      if (later.wy.val(year) !== 1) {
	        year = later.dw.next(year, 2);
	      }
	      var wyMax = later.wy.extent(year)[1], wyEnd = later.wy.end(year);
	      val = val > wyMax ? wyMax : val || wyMax;
	      return later.wy.end(later.date.next(later.Y.val(wyEnd), later.M.val(wyEnd), later.D.val(wyEnd) + 7 * (val - 1)));
	    }
	  };
	  later.year = later.Y = {
	    name: "year",
	    range: 31556900,
	    val: function(d) {
	      return d.Y || (d.Y = later.date.getYear.call(d));
	    },
	    isValid: function(d, val) {
	      return later.Y.val(d) === val;
	    },
	    extent: function() {
	      return [ 1970, 2099 ];
	    },
	    start: function(d) {
	      return d.YStart || (d.YStart = later.date.next(later.Y.val(d)));
	    },
	    end: function(d) {
	      return d.YEnd || (d.YEnd = later.date.prev(later.Y.val(d)));
	    },
	    next: function(d, val) {
	      return val > later.Y.val(d) && val <= later.Y.extent()[1] ? later.date.next(val) : later.NEVER;
	    },
	    prev: function(d, val) {
	      return val < later.Y.val(d) && val >= later.Y.extent()[0] ? later.date.prev(val) : later.NEVER;
	    }
	  };
	  later.fullDate = later.fd = {
	    name: "full date",
	    range: 1,
	    val: function(d) {
	      return d.fd || (d.fd = d.getTime());
	    },
	    isValid: function(d, val) {
	      return later.fd.val(d) === val;
	    },
	    extent: function() {
	      return [ 0, 3250368e7 ];
	    },
	    start: function(d) {
	      return d;
	    },
	    end: function(d) {
	      return d;
	    },
	    next: function(d, val) {
	      return later.fd.val(d) < val ? new Date(val) : later.NEVER;
	    },
	    prev: function(d, val) {
	      return later.fd.val(d) > val ? new Date(val) : later.NEVER;
	    }
	  };
	  later.modifier = {};
	  later.modifier.after = later.modifier.a = function(constraint, values) {
	    var value = values[0];
	    return {
	      name: "after " + constraint.name,
	      range: (constraint.extent(new Date())[1] - value) * constraint.range,
	      val: constraint.val,
	      isValid: function(d, val) {
	        return this.val(d) >= value;
	      },
	      extent: constraint.extent,
	      start: constraint.start,
	      end: constraint.end,
	      next: function(startDate, val) {
	        if (val != value) val = constraint.extent(startDate)[0];
	        return constraint.next(startDate, val);
	      },
	      prev: function(startDate, val) {
	        val = val === value ? constraint.extent(startDate)[1] : value - 1;
	        return constraint.prev(startDate, val);
	      }
	    };
	  };
	  later.modifier.before = later.modifier.b = function(constraint, values) {
	    var value = values[values.length - 1];
	    return {
	      name: "before " + constraint.name,
	      range: constraint.range * (value - 1),
	      val: constraint.val,
	      isValid: function(d, val) {
	        return this.val(d) < value;
	      },
	      extent: constraint.extent,
	      start: constraint.start,
	      end: constraint.end,
	      next: function(startDate, val) {
	        val = val === value ? constraint.extent(startDate)[0] : value;
	        return constraint.next(startDate, val);
	      },
	      prev: function(startDate, val) {
	        val = val === value ? value - 1 : constraint.extent(startDate)[1];
	        return constraint.prev(startDate, val);
	      }
	    };
	  };
	  later.compile = function(schedDef) {
	    var constraints = [], constraintsLen = 0, tickConstraint;
	    for (var key in schedDef) {
	      var nameParts = key.split("_"), name = nameParts[0], mod = nameParts[1], vals = schedDef[key], constraint = mod ? later.modifier[mod](later[name], vals) : later[name];
	      constraints.push({
	        constraint: constraint,
	        vals: vals
	      });
	      constraintsLen++;
	    }
	    constraints.sort(function(a, b) {
	      var ra = a.constraint.range, rb = b.constraint.range;
	      return rb < ra ? -1 : rb > ra ? 1 : 0;
	    });
	    tickConstraint = constraints[constraintsLen - 1].constraint;
	    function compareFn(dir) {
	      return dir === "next" ? function(a, b) {
	        return a.getTime() > b.getTime();
	      } : function(a, b) {
	        return b.getTime() > a.getTime();
	      };
	    }
	    return {
	      start: function(dir, startDate) {
	        var next = startDate, nextVal = later.array[dir], maxAttempts = 1e3, done;
	        while (maxAttempts-- && !done && next) {
	          done = true;
	          for (var i = 0; i < constraintsLen; i++) {
	            var constraint = constraints[i].constraint, curVal = constraint.val(next), extent = constraint.extent(next), newVal = nextVal(curVal, constraints[i].vals, extent);
	            if (!constraint.isValid(next, newVal)) {
	              next = constraint[dir](next, newVal);
	              done = false;
	              break;
	            }
	          }
	        }
	        if (next !== later.NEVER) {
	          next = dir === "next" ? tickConstraint.start(next) : tickConstraint.end(next);
	        }
	        return next;
	      },
	      end: function(dir, startDate) {
	        var result, nextVal = later.array[dir + "Invalid"], compare = compareFn(dir);
	        for (var i = constraintsLen - 1; i >= 0; i--) {
	          var constraint = constraints[i].constraint, curVal = constraint.val(startDate), extent = constraint.extent(startDate), newVal = nextVal(curVal, constraints[i].vals, extent), next;
	          if (newVal !== undefined) {
	            next = constraint[dir](startDate, newVal);
	            if (next && (!result || compare(result, next))) {
	              result = next;
	            }
	          }
	        }
	        return result;
	      },
	      tick: function(dir, date) {
	        return new Date(dir === "next" ? tickConstraint.end(date).getTime() + later.SEC : tickConstraint.start(date).getTime() - later.SEC);
	      },
	      tickStart: function(date) {
	        return tickConstraint.start(date);
	      }
	    };
	  };
	  later.schedule = function(sched) {
	    if (!sched) throw new Error("Missing schedule definition.");
	    if (!sched.schedules) throw new Error("Definition must include at least one schedule.");
	    var schedules = [], schedulesLen = sched.schedules.length, exceptions = [], exceptionsLen = sched.exceptions ? sched.exceptions.length : 0;
	    for (var i = 0; i < schedulesLen; i++) {
	      schedules.push(later.compile(sched.schedules[i]));
	    }
	    for (var j = 0; j < exceptionsLen; j++) {
	      exceptions.push(later.compile(sched.exceptions[j]));
	    }
	    function getInstances(dir, count, startDate, endDate, isRange) {
	      var compare = compareFn(dir), loopCount = count, maxAttempts = 1e3, schedStarts = [], exceptStarts = [], next, end, results = [], isForward = dir === "next", lastResult, rStart = isForward ? 0 : 1, rEnd = isForward ? 1 : 0;
	      startDate = startDate ? new Date(startDate) : new Date();
	      if (!startDate || !startDate.getTime()) throw new Error("Invalid start date.");
	      setNextStarts(dir, schedules, schedStarts, startDate);
	      setRangeStarts(dir, exceptions, exceptStarts, startDate);
	      while (maxAttempts-- && loopCount && (next = findNext(schedStarts, compare))) {
	        if (endDate && compare(next, endDate)) {
	          break;
	        }
	        if (exceptionsLen) {
	          updateRangeStarts(dir, exceptions, exceptStarts, next);
	          if (end = calcRangeOverlap(dir, exceptStarts, next)) {
	            updateNextStarts(dir, schedules, schedStarts, end);
	            continue;
	          }
	        }
	        if (isRange) {
	          var maxEndDate = calcMaxEndDate(exceptStarts, compare);
	          end = calcEnd(dir, schedules, schedStarts, next, maxEndDate);
	          var r = isForward ? [ new Date(Math.max(startDate, next)), end ? new Date(endDate ? Math.min(end, endDate) : end) : undefined ] : [ end ? new Date(endDate ? Math.max(endDate, end.getTime() + later.SEC) : end.getTime() + later.SEC) : undefined, new Date(Math.min(startDate, next.getTime() + later.SEC)) ];
	          if (lastResult && r[rStart].getTime() === lastResult[rEnd].getTime()) {
	            lastResult[rEnd] = r[rEnd];
	            loopCount++;
	          } else {
	            lastResult = r;
	            results.push(lastResult);
	          }
	          if (!end) break;
	          updateNextStarts(dir, schedules, schedStarts, end);
	        } else {
	          results.push(isForward ? new Date(Math.max(startDate, next)) : getStart(schedules, schedStarts, next, endDate));
	          tickStarts(dir, schedules, schedStarts, next);
	        }
	        loopCount--;
	      }
	      for (var i = 0, len = results.length; i < len; i++) {
	        var result = results[i];
	        results[i] = Object.prototype.toString.call(result) === "[object Array]" ? [ cleanDate(result[0]), cleanDate(result[1]) ] : cleanDate(result);
	      }
	      return results.length === 0 ? later.NEVER : count === 1 ? results[0] : results;
	    }
	    function cleanDate(d) {
	      if (d instanceof Date && !isNaN(d.valueOf())) {
	        return new Date(d);
	      }
	      return undefined;
	    }
	    function setNextStarts(dir, schedArr, startsArr, startDate) {
	      for (var i = 0, len = schedArr.length; i < len; i++) {
	        startsArr[i] = schedArr[i].start(dir, startDate);
	      }
	    }
	    function updateNextStarts(dir, schedArr, startsArr, startDate) {
	      var compare = compareFn(dir);
	      for (var i = 0, len = schedArr.length; i < len; i++) {
	        if (startsArr[i] && !compare(startsArr[i], startDate)) {
	          startsArr[i] = schedArr[i].start(dir, startDate);
	        }
	      }
	    }
	    function setRangeStarts(dir, schedArr, rangesArr, startDate) {
	      var compare = compareFn(dir);
	      for (var i = 0, len = schedArr.length; i < len; i++) {
	        var nextStart = schedArr[i].start(dir, startDate);
	        if (!nextStart) {
	          rangesArr[i] = later.NEVER;
	        } else {
	          rangesArr[i] = [ nextStart, schedArr[i].end(dir, nextStart) ];
	        }
	      }
	    }
	    function updateRangeStarts(dir, schedArr, rangesArr, startDate) {
	      var compare = compareFn(dir);
	      for (var i = 0, len = schedArr.length; i < len; i++) {
	        if (rangesArr[i] && !compare(rangesArr[i][0], startDate)) {
	          var nextStart = schedArr[i].start(dir, startDate);
	          if (!nextStart) {
	            rangesArr[i] = later.NEVER;
	          } else {
	            rangesArr[i] = [ nextStart, schedArr[i].end(dir, nextStart) ];
	          }
	        }
	      }
	    }
	    function tickStarts(dir, schedArr, startsArr, startDate) {
	      for (var i = 0, len = schedArr.length; i < len; i++) {
	        if (startsArr[i] && startsArr[i].getTime() === startDate.getTime()) {
	          startsArr[i] = schedArr[i].start(dir, schedArr[i].tick(dir, startDate));
	        }
	      }
	    }
	    function getStart(schedArr, startsArr, startDate, minEndDate) {
	      var result;
	      for (var i = 0, len = startsArr.length; i < len; i++) {
	        if (startsArr[i] && startsArr[i].getTime() === startDate.getTime()) {
	          var start = schedArr[i].tickStart(startDate);
	          if (minEndDate && start < minEndDate) {
	            return minEndDate;
	          }
	          if (!result || start > result) {
	            result = start;
	          }
	        }
	      }
	      return result;
	    }
	    function calcRangeOverlap(dir, rangesArr, startDate) {
	      var compare = compareFn(dir), result;
	      for (var i = 0, len = rangesArr.length; i < len; i++) {
	        var range = rangesArr[i];
	        if (range && !compare(range[0], startDate) && (!range[1] || compare(range[1], startDate))) {
	          if (!result || compare(range[1], result)) {
	            result = range[1];
	          }
	        }
	      }
	      return result;
	    }
	    function calcMaxEndDate(exceptsArr, compare) {
	      var result;
	      for (var i = 0, len = exceptsArr.length; i < len; i++) {
	        if (exceptsArr[i] && (!result || compare(result, exceptsArr[i][0]))) {
	          result = exceptsArr[i][0];
	        }
	      }
	      return result;
	    }
	    function calcEnd(dir, schedArr, startsArr, startDate, maxEndDate) {
	      var compare = compareFn(dir), result;
	      for (var i = 0, len = schedArr.length; i < len; i++) {
	        var start = startsArr[i];
	        if (start && start.getTime() === startDate.getTime()) {
	          var end = schedArr[i].end(dir, start);
	          if (maxEndDate && (!end || compare(end, maxEndDate))) {
	            return maxEndDate;
	          }
	          if (!result || compare(end, result)) {
	            result = end;
	          }
	        }
	      }
	      return result;
	    }
	    function compareFn(dir) {
	      return dir === "next" ? function(a, b) {
	        return !b || a.getTime() > b.getTime();
	      } : function(a, b) {
	        return !a || b.getTime() > a.getTime();
	      };
	    }
	    function findNext(arr, compare) {
	      var next = arr[0];
	      for (var i = 1, len = arr.length; i < len; i++) {
	        if (arr[i] && compare(next, arr[i])) {
	          next = arr[i];
	        }
	      }
	      return next;
	    }
	    return {
	      isValid: function(d) {
	        return getInstances("next", 1, d, d) !== later.NEVER;
	      },
	      next: function(count, startDate, endDate) {
	        return getInstances("next", count || 1, startDate, endDate);
	      },
	      prev: function(count, startDate, endDate) {
	        return getInstances("prev", count || 1, startDate, endDate);
	      },
	      nextRange: function(count, startDate, endDate) {
	        return getInstances("next", count || 1, startDate, endDate, true);
	      },
	      prevRange: function(count, startDate, endDate) {
	        return getInstances("prev", count || 1, startDate, endDate, true);
	      }
	    };
	  };
	  later.setTimeout = function(fn, sched) {
	    var s = later.schedule(sched), t;
	    if (fn) {
	      scheduleTimeout();
	    }
	    function scheduleTimeout() {
	      var now = Date.now(), next = s.next(2, now);
	      if (!next[0]) {
	        t = undefined;
	        return;
	      }
	      var diff = next[0].getTime() - now;
	      if (diff < 1e3) {
	        diff = next[1] ? next[1].getTime() - now : 1e3;
	      }
	      if (diff < 2147483647) {
	        t = setTimeout(fn, diff);
	      } else {
	        t = setTimeout(scheduleTimeout, 2147483647);
	      }
	    }
	    return {
	      isDone: function() {
	        return !t;
	      },
	      clear: function() {
	        clearTimeout(t);
	      }
	    };
	  };
	  later.setInterval = function(fn, sched) {
	    if (!fn) {
	      return;
	    }
	    var t = later.setTimeout(scheduleTimeout, sched), done = t.isDone();
	    function scheduleTimeout() {
	      if (!done) {
	        fn();
	        t = later.setTimeout(scheduleTimeout, sched);
	      }
	    }
	    return {
	      isDone: function() {
	        return t.isDone();
	      },
	      clear: function() {
	        done = true;
	        t.clear();
	      }
	    };
	  };
	  later.date = {};
	  later.date.timezone = function(useLocalTime) {
	    later.date.build = useLocalTime ? function(Y, M, D, h, m, s) {
	      return new Date(Y, M, D, h, m, s);
	    } : function(Y, M, D, h, m, s) {
	      return new Date(Date.UTC(Y, M, D, h, m, s));
	    };
	    var get = useLocalTime ? "get" : "getUTC", d = Date.prototype;
	    later.date.getYear = d[get + "FullYear"];
	    later.date.getMonth = d[get + "Month"];
	    later.date.getDate = d[get + "Date"];
	    later.date.getDay = d[get + "Day"];
	    later.date.getHour = d[get + "Hours"];
	    later.date.getMin = d[get + "Minutes"];
	    later.date.getSec = d[get + "Seconds"];
	    later.date.isUTC = !useLocalTime;
	  };
	  later.date.UTC = function() {
	    later.date.timezone(false);
	  };
	  later.date.localTime = function() {
	    later.date.timezone(true);
	  };
	  later.date.UTC();
	  later.SEC = 1e3;
	  later.MIN = later.SEC * 60;
	  later.HOUR = later.MIN * 60;
	  later.DAY = later.HOUR * 24;
	  later.WEEK = later.DAY * 7;
	  later.DAYS_IN_MONTH = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	  later.NEVER = 0;
	  later.date.next = function(Y, M, D, h, m, s) {
	    return later.date.build(Y, M !== undefined ? M - 1 : 0, D !== undefined ? D : 1, h || 0, m || 0, s || 0);
	  };
	  later.date.nextRollover = function(d, val, constraint, period) {
	    var cur = constraint.val(d), max = constraint.extent(d)[1];
	    return (val || max) <= cur || val > max ? new Date(period.end(d).getTime() + later.SEC) : period.start(d);
	  };
	  later.date.prev = function(Y, M, D, h, m, s) {
	    var len = arguments.length;
	    M = len < 2 ? 11 : M - 1;
	    D = len < 3 ? later.D.extent(later.date.next(Y, M + 1))[1] : D;
	    h = len < 4 ? 23 : h;
	    m = len < 5 ? 59 : m;
	    s = len < 6 ? 59 : s;
	    return later.date.build(Y, M, D, h, m, s);
	  };
	  later.date.prevRollover = function(d, val, constraint, period) {
	    var cur = constraint.val(d);
	    return val >= cur || !val ? period.start(period.prev(d, period.val(d) - 1)) : period.start(d);
	  };
	  later.parse = {};
	  later.parse.cron = function(expr, hasSeconds) {
	    var NAMES = {
	      JAN: 1,
	      FEB: 2,
	      MAR: 3,
	      APR: 4,
	      MAY: 5,
	      JUN: 6,
	      JUL: 7,
	      AUG: 8,
	      SEP: 9,
	      OCT: 10,
	      NOV: 11,
	      DEC: 12,
	      SUN: 1,
	      MON: 2,
	      TUE: 3,
	      WED: 4,
	      THU: 5,
	      FRI: 6,
	      SAT: 7
	    };
	    var REPLACEMENTS = {
	      "* * * * * *": "0/1 * * * * *",
	      "@YEARLY": "0 0 1 1 *",
	      "@ANNUALLY": "0 0 1 1 *",
	      "@MONTHLY": "0 0 1 * *",
	      "@WEEKLY": "0 0 * * 0",
	      "@DAILY": "0 0 * * *",
	      "@HOURLY": "0 * * * *"
	    };
	    var FIELDS = {
	      s: [ 0, 0, 59 ],
	      m: [ 1, 0, 59 ],
	      h: [ 2, 0, 23 ],
	      D: [ 3, 1, 31 ],
	      M: [ 4, 1, 12 ],
	      Y: [ 6, 1970, 2099 ],
	      d: [ 5, 1, 7, 1 ]
	    };
	    function getValue(value, offset, max) {
	      return isNaN(value) ? NAMES[value] || null : Math.min(+value + (offset || 0), max || 9999);
	    }
	    function cloneSchedule(sched) {
	      var clone = {}, field;
	      for (field in sched) {
	        if (field !== "dc" && field !== "d") {
	          clone[field] = sched[field].slice(0);
	        }
	      }
	      return clone;
	    }
	    function add(sched, name, min, max, inc) {
	      var i = min;
	      if (!sched[name]) {
	        sched[name] = [];
	      }
	      while (i <= max) {
	        if (sched[name].indexOf(i) < 0) {
	          sched[name].push(i);
	        }
	        i += inc || 1;
	      }
	      sched[name].sort(function(a, b) {
	        return a - b;
	      });
	    }
	    function addHash(schedules, curSched, value, hash) {
	      if (curSched.d && !curSched.dc || curSched.dc && curSched.dc.indexOf(hash) < 0) {
	        schedules.push(cloneSchedule(curSched));
	        curSched = schedules[schedules.length - 1];
	      }
	      add(curSched, "d", value, value);
	      add(curSched, "dc", hash, hash);
	    }
	    function addWeekday(s, curSched, value) {
	      var except1 = {}, except2 = {};
	      if (value === 1) {
	        add(curSched, "D", 1, 3);
	        add(curSched, "d", NAMES.MON, NAMES.FRI);
	        add(except1, "D", 2, 2);
	        add(except1, "d", NAMES.TUE, NAMES.FRI);
	        add(except2, "D", 3, 3);
	        add(except2, "d", NAMES.TUE, NAMES.FRI);
	      } else {
	        add(curSched, "D", value - 1, value + 1);
	        add(curSched, "d", NAMES.MON, NAMES.FRI);
	        add(except1, "D", value - 1, value - 1);
	        add(except1, "d", NAMES.MON, NAMES.THU);
	        add(except2, "D", value + 1, value + 1);
	        add(except2, "d", NAMES.TUE, NAMES.FRI);
	      }
	      s.exceptions.push(except1);
	      s.exceptions.push(except2);
	    }
	    function addRange(item, curSched, name, min, max, offset) {
	      var incSplit = item.split("/"), inc = +incSplit[1], range = incSplit[0];
	      if (range !== "*" && range !== "0") {
	        var rangeSplit = range.split("-");
	        min = getValue(rangeSplit[0], offset, max);
	        max = getValue(rangeSplit[1], offset, max) || max;
	      }
	      add(curSched, name, min, max, inc);
	    }
	    function parse(item, s, name, min, max, offset) {
	      var value, split, schedules = s.schedules, curSched = schedules[schedules.length - 1];
	      if (item === "L") {
	        item = min - 1;
	      }
	      if ((value = getValue(item, offset, max)) !== null) {
	        add(curSched, name, value, value);
	      } else if ((value = getValue(item.replace("W", ""), offset, max)) !== null) {
	        addWeekday(s, curSched, value);
	      } else if ((value = getValue(item.replace("L", ""), offset, max)) !== null) {
	        addHash(schedules, curSched, value, min - 1);
	      } else if ((split = item.split("#")).length === 2) {
	        value = getValue(split[0], offset, max);
	        addHash(schedules, curSched, value, getValue(split[1]));
	      } else {
	        addRange(item, curSched, name, min, max, offset);
	      }
	    }
	    function isHash(item) {
	      return item.indexOf("#") > -1 || item.indexOf("L") > 0;
	    }
	    function itemSorter(a, b) {
	      return isHash(a) && !isHash(b) ? 1 : a - b;
	    }
	    function parseExpr(expr) {
	      var schedule = {
	        schedules: [ {} ],
	        exceptions: []
	      }, components = expr.replace(/(\s)+/g, " ").split(" "), field, f, component, items;
	      for (field in FIELDS) {
	        f = FIELDS[field];
	        component = components[f[0]];
	        if (component && component !== "*" && component !== "?") {
	          items = component.split(",").sort(itemSorter);
	          var i, length = items.length;
	          for (i = 0; i < length; i++) {
	            parse(items[i], schedule, field, f[1], f[2], f[3]);
	          }
	        }
	      }
	      return schedule;
	    }
	    function prepareExpr(expr) {
	      var prepared = expr.toUpperCase();
	      return REPLACEMENTS[prepared] || prepared;
	    }
	    var e = prepareExpr(expr);
	    return parseExpr(hasSeconds ? e : "0 " + e);
	  };
	  later.parse.recur = function() {
	    var schedules = [], exceptions = [], cur, curArr = schedules, curName, values, every, modifier, applyMin, applyMax, i, last;
	    function add(name, min, max) {
	      name = modifier ? name + "_" + modifier : name;
	      if (!cur) {
	        curArr.push({});
	        cur = curArr[0];
	      }
	      if (!cur[name]) {
	        cur[name] = [];
	      }
	      curName = cur[name];
	      if (every) {
	        values = [];
	        for (i = min; i <= max; i += every) {
	          values.push(i);
	        }
	        last = {
	          n: name,
	          x: every,
	          c: curName.length,
	          m: max
	        };
	      }
	      values = applyMin ? [ min ] : applyMax ? [ max ] : values;
	      var length = values.length;
	      for (i = 0; i < length; i += 1) {
	        var val = values[i];
	        if (curName.indexOf(val) < 0) {
	          curName.push(val);
	        }
	      }
	      values = every = modifier = applyMin = applyMax = 0;
	    }
	    return {
	      schedules: schedules,
	      exceptions: exceptions,
	      on: function() {
	        values = arguments[0] instanceof Array ? arguments[0] : arguments;
	        return this;
	      },
	      every: function(x) {
	        every = x || 1;
	        return this;
	      },
	      after: function(x) {
	        modifier = "a";
	        values = [ x ];
	        return this;
	      },
	      before: function(x) {
	        modifier = "b";
	        values = [ x ];
	        return this;
	      },
	      first: function() {
	        applyMin = 1;
	        return this;
	      },
	      last: function() {
	        applyMax = 1;
	        return this;
	      },
	      time: function() {
	        for (var i = 0, len = values.length; i < len; i++) {
	          var split = values[i].split(":");
	          if (split.length < 3) split.push(0);
	          values[i] = +split[0] * 3600 + +split[1] * 60 + +split[2];
	        }
	        add("t");
	        return this;
	      },
	      second: function() {
	        add("s", 0, 59);
	        return this;
	      },
	      minute: function() {
	        add("m", 0, 59);
	        return this;
	      },
	      hour: function() {
	        add("h", 0, 23);
	        return this;
	      },
	      dayOfMonth: function() {
	        add("D", 1, applyMax ? 0 : 31);
	        return this;
	      },
	      dayOfWeek: function() {
	        add("d", 1, 7);
	        return this;
	      },
	      onWeekend: function() {
	        values = [ 1, 7 ];
	        return this.dayOfWeek();
	      },
	      onWeekday: function() {
	        values = [ 2, 3, 4, 5, 6 ];
	        return this.dayOfWeek();
	      },
	      dayOfWeekCount: function() {
	        add("dc", 1, applyMax ? 0 : 5);
	        return this;
	      },
	      dayOfYear: function() {
	        add("dy", 1, applyMax ? 0 : 366);
	        return this;
	      },
	      weekOfMonth: function() {
	        add("wm", 1, applyMax ? 0 : 5);
	        return this;
	      },
	      weekOfYear: function() {
	        add("wy", 1, applyMax ? 0 : 53);
	        return this;
	      },
	      month: function() {
	        add("M", 1, 12);
	        return this;
	      },
	      year: function() {
	        add("Y", 1970, 2450);
	        return this;
	      },
	      fullDate: function() {
	        for (var i = 0, len = values.length; i < len; i++) {
	          values[i] = values[i].getTime();
	        }
	        add("fd");
	        return this;
	      },
	      customModifier: function(id, vals) {
	        var custom = later.modifier[id];
	        if (!custom) throw new Error("Custom modifier " + id + " not recognized!");
	        modifier = id;
	        values = arguments[1] instanceof Array ? arguments[1] : [ arguments[1] ];
	        return this;
	      },
	      customPeriod: function(id) {
	        var custom = later[id];
	        if (!custom) throw new Error("Custom time period " + id + " not recognized!");
	        add(id, custom.extent(new Date())[0], custom.extent(new Date())[1]);
	        return this;
	      },
	      startingOn: function(start) {
	        return this.between(start, last.m);
	      },
	      between: function(start, end) {
	        cur[last.n] = cur[last.n].splice(0, last.c);
	        every = last.x;
	        add(last.n, start, end);
	        return this;
	      },
	      and: function() {
	        cur = curArr[curArr.push({}) - 1];
	        return this;
	      },
	      except: function() {
	        curArr = exceptions;
	        cur = null;
	        return this;
	      }
	    };
	  };
	  later.parse.text = function(str) {
	    var recur = later.parse.recur, pos = 0, input = "", error;
	    var TOKENTYPES = {
	      eof: /^$/,
	      rank: /^((\d\d\d\d)|([2-5]?1(st)?|[2-5]?2(nd)?|[2-5]?3(rd)?|(0|[1-5]?[4-9]|[1-5]0|1[1-3])(th)?))\b/,
	      time: /^((([0]?[1-9]|1[0-2]):[0-5]\d(\s)?(am|pm))|(([0]?\d|1\d|2[0-3]):[0-5]\d))\b/,
	      dayName: /^((sun|mon|tue(s)?|wed(nes)?|thu(r(s)?)?|fri|sat(ur)?)(day)?)\b/,
	      monthName: /^(jan(uary)?|feb(ruary)?|ma((r(ch)?)?|y)|apr(il)?|ju(ly|ne)|aug(ust)?|oct(ober)?|(sept|nov|dec)(ember)?)\b/,
	      yearIndex: /^(\d\d\d\d)\b/,
	      every: /^every\b/,
	      after: /^after\b/,
	      before: /^before\b/,
	      second: /^(s|sec(ond)?(s)?)\b/,
	      minute: /^(m|min(ute)?(s)?)\b/,
	      hour: /^(h|hour(s)?)\b/,
	      day: /^(day(s)?( of the month)?)\b/,
	      dayInstance: /^day instance\b/,
	      dayOfWeek: /^day(s)? of the week\b/,
	      dayOfYear: /^day(s)? of the year\b/,
	      weekOfYear: /^week(s)?( of the year)?\b/,
	      weekOfMonth: /^week(s)? of the month\b/,
	      weekday: /^weekday\b/,
	      weekend: /^weekend\b/,
	      month: /^month(s)?\b/,
	      year: /^year(s)?\b/,
	      between: /^between (the)?\b/,
	      start: /^(start(ing)? (at|on( the)?)?)\b/,
	      at: /^(at|@)\b/,
	      and: /^(,|and\b)/,
	      except: /^(except\b)/,
	      also: /(also)\b/,
	      first: /^(first)\b/,
	      last: /^last\b/,
	      "in": /^in\b/,
	      of: /^of\b/,
	      onthe: /^on the\b/,
	      on: /^on\b/,
	      through: /(-|^(to|through)\b)/
	    };
	    var NAMES = {
	      jan: 1,
	      feb: 2,
	      mar: 3,
	      apr: 4,
	      may: 5,
	      jun: 6,
	      jul: 7,
	      aug: 8,
	      sep: 9,
	      oct: 10,
	      nov: 11,
	      dec: 12,
	      sun: 1,
	      mon: 2,
	      tue: 3,
	      wed: 4,
	      thu: 5,
	      fri: 6,
	      sat: 7,
	      "1st": 1,
	      fir: 1,
	      "2nd": 2,
	      sec: 2,
	      "3rd": 3,
	      thi: 3,
	      "4th": 4,
	      "for": 4
	    };
	    function t(start, end, text, type) {
	      return {
	        startPos: start,
	        endPos: end,
	        text: text,
	        type: type
	      };
	    }
	    function peek(expected) {
	      var scanTokens = expected instanceof Array ? expected : [ expected ], whiteSpace = /\s+/, token, curInput, m, scanToken, start, len;
	      scanTokens.push(whiteSpace);
	      start = pos;
	      while (!token || token.type === whiteSpace) {
	        len = -1;
	        curInput = input.substring(start);
	        token = t(start, start, input.split(whiteSpace)[0]);
	        var i, length = scanTokens.length;
	        for (i = 0; i < length; i++) {
	          scanToken = scanTokens[i];
	          m = scanToken.exec(curInput);
	          if (m && m.index === 0 && m[0].length > len) {
	            len = m[0].length;
	            token = t(start, start + len, curInput.substring(0, len), scanToken);
	          }
	        }
	        if (token.type === whiteSpace) {
	          start = token.endPos;
	        }
	      }
	      return token;
	    }
	    function scan(expectedToken) {
	      var token = peek(expectedToken);
	      pos = token.endPos;
	      return token;
	    }
	    function parseThroughExpr(tokenType) {
	      var start = +parseTokenValue(tokenType), end = checkAndParse(TOKENTYPES.through) ? +parseTokenValue(tokenType) : start, nums = [];
	      for (var i = start; i <= end; i++) {
	        nums.push(i);
	      }
	      return nums;
	    }
	    function parseRanges(tokenType) {
	      var nums = parseThroughExpr(tokenType);
	      while (checkAndParse(TOKENTYPES.and)) {
	        nums = nums.concat(parseThroughExpr(tokenType));
	      }
	      return nums;
	    }
	    function parseEvery(r) {
	      var num, period, start, end;
	      if (checkAndParse(TOKENTYPES.weekend)) {
	        r.on(NAMES.sun, NAMES.sat).dayOfWeek();
	      } else if (checkAndParse(TOKENTYPES.weekday)) {
	        r.on(NAMES.mon, NAMES.tue, NAMES.wed, NAMES.thu, NAMES.fri).dayOfWeek();
	      } else {
	        num = parseTokenValue(TOKENTYPES.rank);
	        r.every(num);
	        period = parseTimePeriod(r);
	        if (checkAndParse(TOKENTYPES.start)) {
	          num = parseTokenValue(TOKENTYPES.rank);
	          r.startingOn(num);
	          parseToken(period.type);
	        } else if (checkAndParse(TOKENTYPES.between)) {
	          start = parseTokenValue(TOKENTYPES.rank);
	          if (checkAndParse(TOKENTYPES.and)) {
	            end = parseTokenValue(TOKENTYPES.rank);
	            r.between(start, end);
	          }
	        }
	      }
	    }
	    function parseOnThe(r) {
	      if (checkAndParse(TOKENTYPES.first)) {
	        r.first();
	      } else if (checkAndParse(TOKENTYPES.last)) {
	        r.last();
	      } else {
	        r.on(parseRanges(TOKENTYPES.rank));
	      }
	      parseTimePeriod(r);
	    }
	    function parseScheduleExpr(str) {
	      pos = 0;
	      input = str;
	      error = -1;
	      var r = recur();
	      while (pos < input.length && error < 0) {
	        var token = parseToken([ TOKENTYPES.every, TOKENTYPES.after, TOKENTYPES.before, TOKENTYPES.onthe, TOKENTYPES.on, TOKENTYPES.of, TOKENTYPES["in"], TOKENTYPES.at, TOKENTYPES.and, TOKENTYPES.except, TOKENTYPES.also ]);
	        switch (token.type) {
	         case TOKENTYPES.every:
	          parseEvery(r);
	          break;

	         case TOKENTYPES.after:
	          if (peek(TOKENTYPES.time).type !== undefined) {
	            r.after(parseTokenValue(TOKENTYPES.time));
	            r.time();
	          } else {
	            r.after(parseTokenValue(TOKENTYPES.rank));
	            parseTimePeriod(r);
	          }
	          break;

	         case TOKENTYPES.before:
	          if (peek(TOKENTYPES.time).type !== undefined) {
	            r.before(parseTokenValue(TOKENTYPES.time));
	            r.time();
	          } else {
	            r.before(parseTokenValue(TOKENTYPES.rank));
	            parseTimePeriod(r);
	          }
	          break;

	         case TOKENTYPES.onthe:
	          parseOnThe(r);
	          break;

	         case TOKENTYPES.on:
	          r.on(parseRanges(TOKENTYPES.dayName)).dayOfWeek();
	          break;

	         case TOKENTYPES.of:
	          r.on(parseRanges(TOKENTYPES.monthName)).month();
	          break;

	         case TOKENTYPES["in"]:
	          r.on(parseRanges(TOKENTYPES.yearIndex)).year();
	          break;

	         case TOKENTYPES.at:
	          r.on(parseTokenValue(TOKENTYPES.time)).time();
	          while (checkAndParse(TOKENTYPES.and)) {
	            r.on(parseTokenValue(TOKENTYPES.time)).time();
	          }
	          break;

	         case TOKENTYPES.and:
	          break;

	         case TOKENTYPES.also:
	          r.and();
	          break;

	         case TOKENTYPES.except:
	          r.except();
	          break;

	         default:
	          error = pos;
	        }
	      }
	      return {
	        schedules: r.schedules,
	        exceptions: r.exceptions,
	        error: error
	      };
	    }
	    function parseTimePeriod(r) {
	      var timePeriod = parseToken([ TOKENTYPES.second, TOKENTYPES.minute, TOKENTYPES.hour, TOKENTYPES.dayOfYear, TOKENTYPES.dayOfWeek, TOKENTYPES.dayInstance, TOKENTYPES.day, TOKENTYPES.month, TOKENTYPES.year, TOKENTYPES.weekOfMonth, TOKENTYPES.weekOfYear ]);
	      switch (timePeriod.type) {
	       case TOKENTYPES.second:
	        r.second();
	        break;

	       case TOKENTYPES.minute:
	        r.minute();
	        break;

	       case TOKENTYPES.hour:
	        r.hour();
	        break;

	       case TOKENTYPES.dayOfYear:
	        r.dayOfYear();
	        break;

	       case TOKENTYPES.dayOfWeek:
	        r.dayOfWeek();
	        break;

	       case TOKENTYPES.dayInstance:
	        r.dayOfWeekCount();
	        break;

	       case TOKENTYPES.day:
	        r.dayOfMonth();
	        break;

	       case TOKENTYPES.weekOfMonth:
	        r.weekOfMonth();
	        break;

	       case TOKENTYPES.weekOfYear:
	        r.weekOfYear();
	        break;

	       case TOKENTYPES.month:
	        r.month();
	        break;

	       case TOKENTYPES.year:
	        r.year();
	        break;

	       default:
	        error = pos;
	      }
	      return timePeriod;
	    }
	    function checkAndParse(tokenType) {
	      var found = peek(tokenType).type === tokenType;
	      if (found) {
	        scan(tokenType);
	      }
	      return found;
	    }
	    function parseToken(tokenType) {
	      var t = scan(tokenType);
	      if (t.type) {
	        t.text = convertString(t.text, tokenType);
	      } else {
	        error = pos;
	      }
	      return t;
	    }
	    function parseTokenValue(tokenType) {
	      return parseToken(tokenType).text;
	    }
	    function convertString(str, tokenType) {
	      var output = str;
	      switch (tokenType) {
	       case TOKENTYPES.time:
	        var parts = str.split(/(:|am|pm)/), hour = parts[3] === "pm" && parts[0] < 12 ? parseInt(parts[0], 10) + 12 : parts[0], min = parts[2].trim();
	        output = (hour.length === 1 ? "0" : "") + hour + ":" + min;
	        break;

	       case TOKENTYPES.rank:
	        output = parseInt(/^\d+/.exec(str)[0], 10);
	        break;

	       case TOKENTYPES.monthName:
	       case TOKENTYPES.dayName:
	        output = NAMES[str.substring(0, 3)];
	        break;
	      }
	      return output;
	    }
	    return parseScheduleExpr(str.toLowerCase());
	  };
	  return later;
	}();

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./af": 3,
		"./af.js": 3,
		"./ar": 9,
		"./ar-dz": 4,
		"./ar-dz.js": 4,
		"./ar-ly": 5,
		"./ar-ly.js": 5,
		"./ar-ma": 6,
		"./ar-ma.js": 6,
		"./ar-sa": 7,
		"./ar-sa.js": 7,
		"./ar-tn": 8,
		"./ar-tn.js": 8,
		"./ar.js": 9,
		"./az": 10,
		"./az.js": 10,
		"./be": 11,
		"./be.js": 11,
		"./bg": 12,
		"./bg.js": 12,
		"./bn": 13,
		"./bn.js": 13,
		"./bo": 14,
		"./bo.js": 14,
		"./br": 15,
		"./br.js": 15,
		"./bs": 16,
		"./bs.js": 16,
		"./ca": 17,
		"./ca.js": 17,
		"./cs": 18,
		"./cs.js": 18,
		"./cv": 19,
		"./cv.js": 19,
		"./cy": 20,
		"./cy.js": 20,
		"./da": 21,
		"./da.js": 21,
		"./de": 23,
		"./de-at": 22,
		"./de-at.js": 22,
		"./de.js": 23,
		"./dv": 24,
		"./dv.js": 24,
		"./el": 25,
		"./el.js": 25,
		"./en-au": 26,
		"./en-au.js": 26,
		"./en-ca": 27,
		"./en-ca.js": 27,
		"./en-gb": 28,
		"./en-gb.js": 28,
		"./en-ie": 29,
		"./en-ie.js": 29,
		"./en-nz": 30,
		"./en-nz.js": 30,
		"./eo": 31,
		"./eo.js": 31,
		"./es": 33,
		"./es-do": 32,
		"./es-do.js": 32,
		"./es.js": 33,
		"./et": 34,
		"./et.js": 34,
		"./eu": 35,
		"./eu.js": 35,
		"./fa": 36,
		"./fa.js": 36,
		"./fi": 37,
		"./fi.js": 37,
		"./fo": 38,
		"./fo.js": 38,
		"./fr": 41,
		"./fr-ca": 39,
		"./fr-ca.js": 39,
		"./fr-ch": 40,
		"./fr-ch.js": 40,
		"./fr.js": 41,
		"./fy": 42,
		"./fy.js": 42,
		"./gd": 43,
		"./gd.js": 43,
		"./gl": 44,
		"./gl.js": 44,
		"./he": 45,
		"./he.js": 45,
		"./hi": 46,
		"./hi.js": 46,
		"./hr": 47,
		"./hr.js": 47,
		"./hu": 48,
		"./hu.js": 48,
		"./hy-am": 49,
		"./hy-am.js": 49,
		"./id": 50,
		"./id.js": 50,
		"./is": 51,
		"./is.js": 51,
		"./it": 52,
		"./it.js": 52,
		"./ja": 53,
		"./ja.js": 53,
		"./jv": 54,
		"./jv.js": 54,
		"./ka": 55,
		"./ka.js": 55,
		"./kk": 56,
		"./kk.js": 56,
		"./km": 57,
		"./km.js": 57,
		"./ko": 58,
		"./ko.js": 58,
		"./ky": 59,
		"./ky.js": 59,
		"./lb": 60,
		"./lb.js": 60,
		"./lo": 61,
		"./lo.js": 61,
		"./lt": 62,
		"./lt.js": 62,
		"./lv": 63,
		"./lv.js": 63,
		"./me": 64,
		"./me.js": 64,
		"./mi": 65,
		"./mi.js": 65,
		"./mk": 66,
		"./mk.js": 66,
		"./ml": 67,
		"./ml.js": 67,
		"./mr": 68,
		"./mr.js": 68,
		"./ms": 70,
		"./ms-my": 69,
		"./ms-my.js": 69,
		"./ms.js": 70,
		"./my": 71,
		"./my.js": 71,
		"./nb": 72,
		"./nb.js": 72,
		"./ne": 73,
		"./ne.js": 73,
		"./nl": 75,
		"./nl-be": 74,
		"./nl-be.js": 74,
		"./nl.js": 75,
		"./nn": 76,
		"./nn.js": 76,
		"./pa-in": 77,
		"./pa-in.js": 77,
		"./pl": 78,
		"./pl.js": 78,
		"./pt": 80,
		"./pt-br": 79,
		"./pt-br.js": 79,
		"./pt.js": 80,
		"./ro": 81,
		"./ro.js": 81,
		"./ru": 82,
		"./ru.js": 82,
		"./se": 83,
		"./se.js": 83,
		"./si": 84,
		"./si.js": 84,
		"./sk": 85,
		"./sk.js": 85,
		"./sl": 86,
		"./sl.js": 86,
		"./sq": 87,
		"./sq.js": 87,
		"./sr": 89,
		"./sr-cyrl": 88,
		"./sr-cyrl.js": 88,
		"./sr.js": 89,
		"./ss": 90,
		"./ss.js": 90,
		"./sv": 91,
		"./sv.js": 91,
		"./sw": 92,
		"./sw.js": 92,
		"./ta": 93,
		"./ta.js": 93,
		"./te": 94,
		"./te.js": 94,
		"./tet": 95,
		"./tet.js": 95,
		"./th": 96,
		"./th.js": 96,
		"./tl-ph": 97,
		"./tl-ph.js": 97,
		"./tlh": 98,
		"./tlh.js": 98,
		"./tr": 99,
		"./tr.js": 99,
		"./tzl": 100,
		"./tzl.js": 100,
		"./tzm": 102,
		"./tzm-latn": 101,
		"./tzm-latn.js": 101,
		"./tzm.js": 102,
		"./uk": 103,
		"./uk.js": 103,
		"./uz": 104,
		"./uz.js": 104,
		"./vi": 105,
		"./vi.js": 105,
		"./x-pseudo": 106,
		"./x-pseudo.js": 106,
		"./yo": 107,
		"./yo.js": 107,
		"./zh-cn": 108,
		"./zh-cn.js": 108,
		"./zh-hk": 109,
		"./zh-hk.js": 109,
		"./zh-tw": 110,
		"./zh-tw.js": 110
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 115;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(118);

/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	/* global hasOwnProperty:true */

	'use strict';

	var assign = __webpack_require__(117);
	var keyOf = __webpack_require__(113);
	var invariant = __webpack_require__(112);
	var hasOwnProperty = ({}).hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({ $push: null });
	var COMMAND_UNSHIFT = keyOf({ $unshift: null });
	var COMMAND_SPLICE = keyOf({ $splice: null });
	var COMMAND_SET = keyOf({ $set: null });
	var COMMAND_MERGE = keyOf({ $merge: null });
	var COMMAND_APPLY = keyOf({ $apply: null });

	var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function (command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : undefined;
	  var specValue = spec[command];
	  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : undefined;
	}

	function update(value, spec) {
	  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : undefined;

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : undefined;

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : undefined;
	    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : undefined;
	    assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function (item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function (item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : undefined;
	    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	    spec[COMMAND_SPLICE].forEach(function (args) {
	      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined;
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(111)))

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(120);
	module.exports = schedule;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof module !== "undefined" && module.exports) {
	  this.later = __webpack_require__(2);
	}

	schedule = function(later) {
	  "use strict";
	  var schedule = {
	    version: "0.6.3"
	  };
	  if (!later) throw new Error("Laterjs must be included before Schedulejs.");
	  if (!Array.isArray) {
	    Array.isArray = function(vArg) {
	      return Object.prototype.toString.call(vArg) === "[object Array]";
	    };
	  }
	  if (!Array.prototype.indexOf) {
	    Array.prototype.indexOf = function(searchElement) {
	      "use strict";
	      if (this == null) {
	        throw new TypeError();
	      }
	      var t = Object(this);
	      var len = t.length >>> 0;
	      if (len === 0) {
	        return -1;
	      }
	      var n = 0;
	      if (arguments.length > 1) {
	        n = Number(arguments[1]);
	        if (n != n) {
	          n = 0;
	        } else if (n != 0 && n != Infinity && n != -Infinity) {
	          n = (n > 0 || -1) * Math.floor(Math.abs(n));
	        }
	      }
	      if (n >= len) {
	        return -1;
	      }
	      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
	      for (;k < len; k++) {
	        if (k in t && t[k] === searchElement) {
	          return k;
	        }
	      }
	      return -1;
	    };
	  }
	  schedule.date = {};
	  schedule.date.UTC = function() {
	    later.date.UTC();
	  };
	  schedule.date.localTime = function() {
	    later.date.localTime();
	  };
	  schedule.functor = function(v) {
	    return typeof v === "function" ? v : function() {
	      return v;
	    };
	  };
	  schedule.memoizedRangeFn = function(fn) {
	    var cache = {};
	    return function(start) {
	      if (!cache[start]) {
	        var result = fn(1, start);
	        cache[start] = [ result[0] ? result[0].getTime() : 41024448e5, result[1] ? result[1].getTime() : 41024448e5 ];
	      }
	      return cache[start];
	    };
	  };
	  schedule.sort = {};
	  schedule.sort.tasks = function(taskGraph, readyTasks) {
	    readyTasks.sort(function(a, b) {
	      var ta = taskGraph.tasks[a], tb = taskGraph.tasks[b];
	      if (tb.priority && (!ta.priority || tb.priority > ta.priority)) {
	        return -1;
	      }
	      if (ta.priority && (!tb.priority || ta.priority > tb.priority)) {
	        return 1;
	      }
	      return taskGraph.tasks[b].floatAmt > taskGraph.tasks[a].floatAmt;
	    });
	  };
	  schedule.resources = function() {
	    var id = resourcesId, available = resourcesAvailable, isNotReservable = resourcesIsNotReservable;
	    function resources(data) {
	      var items = [], fid = schedule.functor(id), favailable = schedule.functor(available), freserve = schedule.functor(isNotReservable);
	      for (var i = 0, len = data.length; i < len; i++) {
	        var resource = data[i], rId = fid.call(this, resource, i), rAvailable = favailable.call(this, resource, i), rReserve = freserve.call(this, resource, i);
	        items.push({
	          id: rId,
	          available: rAvailable,
	          isNotReservable: rReserve
	        });
	      }
	      return items;
	    }
	    resources.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return resources;
	    };
	    resources.available = function(_) {
	      if (!arguments.length) return available;
	      available = _;
	      return resources;
	    };
	    resources.isNotReservable = function(_) {
	      if (!arguments.length) return isNotReservable;
	      isNotReservable = _;
	      return resources;
	    };
	    return resources;
	  };
	  function resourcesId(d) {
	    return d.id;
	  }
	  function resourcesAvailable(d) {
	    return d.available;
	  }
	  function resourcesIsNotReservable(d) {
	    return d.isNotReservable || false;
	  }
	  schedule.tasks = function() {
	    var id = tasksId, duration = tasksDuration, available = tasksAvailable, resources = tasksResources, dependsOn = tasksDependsOn, minSchedule = tasksMinSchedule, priority = tasksPriority;
	    function tasks(data) {
	      var items = [], fid = schedule.functor(id), fduration = schedule.functor(duration), favailable = schedule.functor(available), fresources = schedule.functor(resources), fdependsOn = schedule.functor(dependsOn), fminschedule = schedule.functor(minSchedule), fpriority = schedule.functor(priority);
	      for (var i = 0, len = data.length; i < len; i++) {
	        var task = data[i], item = {
	          id: fid.call(this, task, i),
	          duration: fduration.call(this, task, i),
	          available: favailable.call(this, task, i),
	          resources: fresources.call(this, task, i),
	          dependsOn: fdependsOn.call(this, task, i),
	          minSchedule: fminschedule.call(this, task, i),
	          priority: fpriority.call(this, task, i)
	        };
	        items.push(item);
	      }
	      return items;
	    }
	    tasks.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return tasks;
	    };
	    tasks.duration = function(_) {
	      if (!arguments.length) return duration;
	      duration = _;
	      return tasks;
	    };
	    tasks.available = function(_) {
	      if (!arguments.length) return available;
	      available = _;
	      return tasks;
	    };
	    tasks.resources = function(_) {
	      if (!arguments.length) return resources;
	      resources = _;
	      return tasks;
	    };
	    tasks.dependsOn = function(_) {
	      if (!arguments.length) return dependsOn;
	      dependsOn = _;
	      return tasks;
	    };
	    tasks.minSchedule = function(_) {
	      if (!arguments.length) return minSchedule;
	      minSchedule = _;
	      return tasks;
	    };
	    tasks.priority = function(_) {
	      if (!arguments.length) return priority;
	      priority = _;
	      return tasks;
	    };
	    return tasks;
	  };
	  function tasksId(d) {
	    return d.id;
	  }
	  function tasksDuration(d) {
	    return d.duration;
	  }
	  function tasksAvailable(d) {
	    return d.available;
	  }
	  function tasksResources(d) {
	    return d.resources;
	  }
	  function tasksDependsOn(d) {
	    return d.dependsOn;
	  }
	  function tasksMinSchedule(d) {
	    return d.minSchedule;
	  }
	  function tasksPriority(d) {
	    return d.priority;
	  }
	  schedule.dependencyGraph = function(taskArr) {
	    function createDependencyGraph(tasks) {
	      var graph = {
	        tasks: {},
	        roots: [],
	        leaves: [],
	        resources: [],
	        depth: 0,
	        end: 0
	      };
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var t = tasks[i];
	        graph.tasks[t.id] = {
	          id: t.id,
	          duration: t.duration,
	          priority: t.priority,
	          schedule: t.schedule,
	          minSchedule: t.minSchedule,
	          dependsOn: t.dependsOn,
	          resources: t.resources
	        };
	      }
	      setResources(graph);
	      setRequiredBy(graph.tasks);
	      setRootsAndLeaves(graph);
	      setDepth(graph, graph.leaves, 0);
	      graph.depth += 1;
	      forwardPass(graph, {}, graph.roots, 0);
	      setEnd(graph, graph.leaves);
	      backwardPass(graph, {}, graph.leaves, graph.end);
	      return graph;
	    }
	    function setResources(graph) {
	      for (var id in graph.tasks) {
	        var task = graph.tasks[id];
	        if (!isEmpty(task.resources)) {
	          for (var i = 0, len = task.resources.length; i < len; i++) {
	            var resId = task.resources[i];
	            if (graph.resources.indexOf(resId) === -1) {
	              graph.resources.push(resId);
	            }
	          }
	        }
	      }
	    }
	    function setRequiredBy(tasks) {
	      for (var id in tasks) {
	        var child = tasks[id], dependsOn = child.dependsOn;
	        if (!isEmpty(dependsOn)) {
	          for (var i = 0, len = dependsOn.length; i < len; i++) {
	            var parent = tasks[dependsOn[i]];
	            (parent.requiredBy || (parent.requiredBy = [])).push(child.id);
	          }
	        }
	      }
	    }
	    function setRootsAndLeaves(graph) {
	      for (var id in graph.tasks) {
	        var task = graph.tasks[id];
	        if (isEmpty(task.dependsOn)) {
	          graph.roots.push(task.id);
	        }
	        if (isEmpty(task.requiredBy)) {
	          graph.leaves.push(task.id);
	        }
	      }
	    }
	    function setDepth(graph, tasks, depth) {
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var task = graph.tasks[tasks[i]], dependsOn = task.dependsOn;
	        task.depth = !task.depth || depth > task.depth ? depth : task.depth;
	        graph.depth = depth > graph.depth ? depth : graph.depth;
	        if (!isEmpty(dependsOn)) {
	          setDepth(graph, dependsOn, task.depth + 1);
	        }
	      }
	    }
	    function forwardPass(graph, depEnds, tasks, start) {
	      updateDependencies(depEnds, tasks, start);
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var tid = tasks[i], task = graph.tasks[tid], dependsOn = task.dependsOn, dep = depEnds[tid];
	        if (!task.earlyFinish && (isEmpty(dependsOn) || dep && dep[0] === dependsOn.length)) {
	          task.earlyStart = dep[1];
	          task.earlyFinish = dep[1] + task.duration;
	          if (!isEmpty(task.requiredBy)) {
	            forwardPass(graph, depEnds, task.requiredBy, task.earlyFinish);
	          }
	        }
	      }
	    }
	    function setEnd(graph, tasks) {
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var finish = graph.tasks[tasks[i]].earlyFinish;
	        graph.end = finish > graph.end ? finish : graph.end;
	      }
	    }
	    function backwardPass(graph, depEnds, tasks, end) {
	      updateDependencies(depEnds, tasks, end, true);
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var tid = tasks[i], task = graph.tasks[tid], requiredBy = task.requiredBy, dep = depEnds[tid];
	        if (isEmpty(requiredBy) || dep && dep[0] === requiredBy.length) {
	          task.lateStart = dep[1] - task.duration;
	          task.lateFinish = dep[1];
	          task.floatAmt = task.lateFinish - task.earlyFinish;
	          if (!isEmpty(task.dependsOn)) {
	            backwardPass(graph, depEnds, task.dependsOn, task.lateStart);
	          }
	        }
	      }
	    }
	    function updateDependencies(deps, tasks, start, rev) {
	      var compare = rev ? function(a, b) {
	        return b > a;
	      } : function(a, b) {
	        return a > b;
	      };
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var id = tasks[i];
	        if (deps[id]) {
	          deps[id][0] = deps[id][0] + 1;
	          deps[id][1] = compare(start, deps[id][1]) ? start : deps[id][1];
	        } else {
	          deps[id] = [ 1, start ];
	        }
	      }
	    }
	    function isEmpty(arr) {
	      return !arr || arr.length === 0;
	    }
	    return createDependencyGraph(taskArr);
	  };
	  schedule.resourceManager = function(resourceDefinitions, startDate) {
	    var defaultSched = {
	      schedules: [ {
	        fd_a: [ startDate.getTime() ]
	      } ]
	    }, rMap = buildResourceMap(resourceDefinitions, startDate);
	    function buildResourceMap(resourceDefinitions, start) {
	      var map = {};
	      if (resourceDefinitions) {
	        for (var i = 0, len = resourceDefinitions.length; i < len; i++) {
	          addResourceToMap(map, resourceDefinitions[i], start);
	        }
	      }
	      return map;
	    }
	    function addResourceToMap(map, def, start) {
	      var sched = JSON.parse(JSON.stringify(def.available || defaultSched)), nextFn = schedule.memoizedRangeFn(later.schedule(sched).nextRange);
	      map[def.id] = {
	        schedule: sched,
	        next: nextFn,
	        nextAvail: nextFn(start)
	      };
	    }
	    function getReservation(resources, start, min, max) {
	      var reservation, schedules = [], delays = {}, maxTries = 50;
	      initRanges(resources, start, schedules, delays);
	      while (!(reservation = tryReservation(schedules, min, max)).success && --maxTries) {
	        updateRanges(schedules, nextValidStart(schedules), delays);
	      }
	      reservation.delays = delays;
	      return reservation;
	    }
	    function initRanges(resources, start, ranges, delays) {
	      for (var i = 0, len = resources.length; i < len; i++) {
	        var resId = resources[i];
	        if (Array.isArray(resId)) {
	          var subRanges = [], subDelays = {};
	          initRanges(resId, start, subRanges, subDelays);
	          var longDelay = getLongestDelay(subDelays);
	          if (longDelay) {
	            delays[longDelay] = subDelays[longDelay];
	          }
	          var schedule = {
	            subRanges: subRanges
	          };
	          setEarliestSubRange(schedule);
	          ranges.push(schedule);
	        } else {
	          var res = rMap[resId], range = res.nextAvail[0] >= start ? res.nextAvail : res.next(start);
	          if (range[0] > start && resId !== "_proj") {
	            delays[resId] = {
	              needed: start,
	              available: range[0]
	            };
	          }
	          ranges.push({
	            id: resId,
	            range: range
	          });
	        }
	      }
	    }
	    function tryReservation(schedules, min, max) {
	      var reservation = {
	        success: false
	      }, resources = [], start, end;
	      for (var i = 0, len = schedules.length; i < len; i++) {
	        var schedule = schedules[i], range = schedule.range;
	        if (!isInternal(schedule)) {
	          resources.push(schedule.id);
	        }
	        start = !start || range[0] > start ? range[0] : start;
	        end = !end || range[1] < end ? range[1] : end;
	      }
	      var duration = (end - start) / later.MIN;
	      if (duration >= min || duration >= max) {
	        duration = max && duration > max ? max : duration;
	        reservation = createReservation(resources, start, duration);
	      }
	      return reservation;
	    }
	    function createReservation(resources, start, duration) {
	      var end = start + duration * later.MIN, reservation = {
	        resources: resources,
	        start: start,
	        end: end,
	        duration: duration,
	        success: true
	      };
	      applyReservation(resources, start, end);
	      return reservation;
	    }
	    function updateRanges(resources, start, delays) {
	      for (var i = 0, len = resources.length; i < len; i++) {
	        var res = resources[i];
	        if (res.range[1] > start) continue;
	        if (res.subRanges) {
	          updateRanges(res.subRanges, start, {});
	          setEarliestSubRange(res);
	        } else {
	          res.range = rMap[res.id].next(start);
	          if (res.id !== "_proj" && !delays[res.id]) {
	            delays[res.id] = {
	              needed: start,
	              available: res.range[0]
	            };
	          }
	        }
	      }
	    }
	    function applyReservation(resources, start, end) {
	      for (var i = 0, len = resources.length; i < len; i++) {
	        var res = rMap[resources[i]];
	        if (res.isNotReservable) continue;
	        if (start !== res.nextAvail[0]) {
	          if (!res.schedule.exceptions) res.schedule.exceptions = [];
	          res.schedule.exceptions.push({
	            fd_a: [ start ],
	            fd_b: [ end ]
	          });
	          res.next = schedule.memoizedRangeFn(later.schedule(res.schedule).nextRange);
	          end = res.nextAvail[0];
	        }
	        res.nextAvail = res.next(end);
	      }
	    }
	    function nextValidStart(schedules) {
	      var latest;
	      for (var i = 0, len = schedules.length; i < len; i++) {
	        var end = schedules[i].range[1];
	        latest = !latest || end < latest ? end : latest;
	      }
	      return latest;
	    }
	    function setEarliestSubRange(schedule) {
	      var minId, minRange;
	      for (var i = 0, len = schedule.subRanges.length; i < len; i++) {
	        var sub = schedule.subRanges[i];
	        if (!minId || sub.range[0] < minRange[0]) {
	          minId = sub.id;
	          minRange = sub.range;
	        }
	      }
	      schedule.id = minId;
	      schedule.range = minRange;
	    }
	    function getLongestDelay(delays) {
	      var latest, lid;
	      for (var id in delays) {
	        var available = delays[id].available;
	        if (!latest || available < latest) {
	          latest = available;
	          lid = id;
	        }
	      }
	      return lid;
	    }
	    function isInternal(resource) {
	      return resource.id[0] === "_";
	    }
	    return {
	      getResource: function(id) {
	        return rMap[id];
	      },
	      addResource: function(arr, prefix, start) {
	        for (var i = 0, len = arr.length; i < len; i++) {
	          var def = typeof arr[i] !== "object" ? {
	            id: prefix + arr[i]
	          } : {
	            id: prefix + arr[i].id,
	            available: arr[i].available,
	            isNotReservable: arr[i].isNotReservable
	          };
	          if (!rMap[def.id]) {
	            addResourceToMap(rMap, def, start);
	          }
	        }
	      },
	      makeReservation: function(resources, start, min, max) {
	        start = start ? new Date(start) : new Date();
	        return getReservation(resources, start.getTime(), min || 1, max);
	      },
	      optimize: function(start) {
	        for (var id in rMap) {
	          var res = rMap[id];
	          if (res.schedule.exceptions) {
	            var curExceptions = res.schedule.exceptions;
	            res.schedule.exceptions = [];
	            for (var i = 0, len = curExceptions.length; i < len; i++) {
	              if (!curExceptions[i].fd_b || curExceptions[i].fd_b > start) {
	                res.schedule.exceptions.push(curExceptions[i]);
	              }
	            }
	            res.next = schedule.memoizedRangeFn(later.schedule(res.schedule).nextRange);
	          }
	          if (res.nextAvail[0] < start) {
	            res.nextAvail = res.next(start);
	          }
	        }
	      }
	    };
	  };
	  schedule.create = function(tasks, resources, sched, scheduleStart) {
	    if (!Array.isArray(tasks)) {
	      throw new Error("Tasks are required and must be passed in as an array.");
	    }
	    if (resources && !Array.isArray(resources)) {
	      throw new Error("Resources must be passed in as an array.");
	    }
	    var startDate = scheduleStart ? new Date(scheduleStart) : new Date();
	    if (!startDate || !startDate.getTime()) {
	      throw new Error("Invalid start date specified.");
	    }
	    var taskGraph = schedule.dependencyGraph(tasks), resMgr = schedule.resourceManager(resources, startDate), scheduledTasks = {};
	    function generateSchedule() {
	      var range, failedTasks = [];
	      resMgr.addResource(taskGraph.resources, "", startDate);
	      resMgr.addResource([ {
	        id: "_proj",
	        available: sched
	      } ], "", startDate);
	      resMgr.addResource(tasks, "_task", startDate);
	      forwardPass(taskGraph.roots);
	      range = getSummary(tasks, failedTasks);
	      backwardPass(taskGraph.leaves, range[1]);
	      return {
	        scheduledTasks: scheduledTasks,
	        failedTasks: failedTasks.length ? failedTasks : null,
	        success: failedTasks.length === 0,
	        start: range[0],
	        end: range[1]
	      };
	    }
	    function forwardPass(roots) {
	      var readyTasks = roots.slice(0), dependencies = {};
	      for (var i = 0, len = roots.length; i < len; i++) {
	        dependencies[roots[i]] = [ 0, startDate.getTime() ];
	      }
	      while (readyTasks.length) {
	        schedule.sort.tasks(taskGraph, readyTasks);
	        var task = taskGraph.tasks[readyTasks.pop()], start = dependencies[task.id][1], end = forwardPassTask(task, start);
	        if (end && task.requiredBy) {
	          updateDependencies(readyTasks, dependencies, task.requiredBy, end);
	          resMgr.optimize(getMinStart(dependencies));
	        }
	      }
	    }
	    function forwardPassTask(task, start) {
	      var resAll = [ "_proj", "_task" + task.id ], resources = task.resources ? resAll.concat(task.resources) : resAll, duration = task.duration, next = start, scheduledTask = {
	        schedule: [],
	        duration: task.duration
	      };
	      while (duration) {
	        var r = resMgr.makeReservation(resources, next, task.minSchedule || 1, duration);
	        if (!r.success) return undefined;
	        scheduledTask.earlyStart = scheduledTask.earlyStart || r.start;
	        scheduledTask.schedule.push(r);
	        duration -= r.duration;
	        next = r.end;
	      }
	      scheduledTask.earlyFinish = next;
	      scheduledTasks[task.id] = scheduledTask;
	      return next;
	    }
	    function getSummary(tasks, failedTasks) {
	      var start, end;
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var t = scheduledTasks[tasks[i].id];
	        if (t) {
	          start = !start || t.earlyStart < start ? t.earlyStart : start;
	          end = !end || t.earlyFinish > end ? t.earlyFinish : end;
	        } else {
	          failedTasks.push(tasks[i].id);
	        }
	      }
	      return [ start, end ];
	    }
	    function updateDependencies(readyTasks, dependencies, tasks, end) {
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var tid = tasks[i], dependsOn = taskGraph.tasks[tid].dependsOn, metDeps = dependencies[tid] || (dependencies[tid] = [ 0, 0 ]);
	        metDeps[0] += 1;
	        metDeps[1] = end > metDeps[1] ? end : metDeps[1];
	        if (!dependsOn || metDeps[0] >= dependsOn.length) {
	          readyTasks.push(tid);
	        }
	      }
	    }
	    function getMinStart(dependencies) {
	      var min;
	      for (var id in dependencies) {
	        if (!min || min > dependencies[id][1]) {
	          min = dependencies[id][1];
	        }
	      }
	      return min;
	    }
	    function backwardPass(tasks, finishDate) {
	      for (var i = 0, len = tasks.length; i < len; i++) {
	        var sTask = scheduledTasks[tasks[i]], dependsOn = taskGraph.tasks[tasks[i]].dependsOn;
	        if (sTask) {
	          sTask.lateFinish = finishDate;
	          sTask.floatAmt = (sTask.lateFinish - sTask.earlyFinish) / later.MIN;
	          if (dependsOn) {
	            backwardPass(dependsOn, sTask.earlyStart);
	          }
	        }
	      }
	    }
	    return generateSchedule();
	  };
	  return schedule;
	}(this.later);

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	* svg.js - A lightweight library for manipulating and animating SVG.
	* @version 2.3.7
	* https://svgdotjs.github.io/
	*
	* @copyright Wout Fierens <wout@mick-wout.com>
	* @license MIT
	*
	* BUILT: Sat Jan 14 2017 07:23:18 GMT+0100 (CET)
	*/;
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	      return factory(root, root.document)
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  } else if (typeof exports === 'object') {
	    module.exports = root.document ? factory(root, root.document) : function(w){ return factory(w, w.document) }
	  } else {
	    root.SVG = factory(root, root.document)
	  }
	}(typeof window !== "undefined" ? window : this, function(window, document) {

	// The main wrapping element
	var SVG = this.SVG = function(element) {
	  if (SVG.supported) {
	    element = new SVG.Doc(element)

	    if(!SVG.parser.draw)
	      SVG.prepare()

	    return element
	  }
	}

	// Default namespaces
	SVG.ns    = 'http://www.w3.org/2000/svg'
	SVG.xmlns = 'http://www.w3.org/2000/xmlns/'
	SVG.xlink = 'http://www.w3.org/1999/xlink'
	SVG.svgjs = 'http://svgjs.com/svgjs'

	// Svg support test
	SVG.supported = (function() {
	  return !! document.createElementNS &&
	         !! document.createElementNS(SVG.ns,'svg').createSVGRect
	})()

	// Don't bother to continue if SVG is not supported
	if (!SVG.supported) return false

	// Element id sequence
	SVG.did  = 1000

	// Get next named element id
	SVG.eid = function(name) {
	  return 'Svgjs' + capitalize(name) + (SVG.did++)
	}

	// Method for element creation
	SVG.create = function(name) {
	  // create element
	  var element = document.createElementNS(this.ns, name)

	  // apply unique id
	  element.setAttribute('id', this.eid(name))

	  return element
	}

	// Method for extending objects
	SVG.extend = function() {
	  var modules, methods, key, i

	  // Get list of modules
	  modules = [].slice.call(arguments)

	  // Get object with extensions
	  methods = modules.pop()

	  for (i = modules.length - 1; i >= 0; i--)
	    if (modules[i])
	      for (key in methods)
	        modules[i].prototype[key] = methods[key]

	  // Make sure SVG.Set inherits any newly added methods
	  if (SVG.Set && SVG.Set.inherit)
	    SVG.Set.inherit()
	}

	// Invent new element
	SVG.invent = function(config) {
	  // Create element initializer
	  var initializer = typeof config.create == 'function' ?
	    config.create :
	    function() {
	      this.constructor.call(this, SVG.create(config.create))
	    }

	  // Inherit prototype
	  if (config.inherit)
	    initializer.prototype = new config.inherit

	  // Extend with methods
	  if (config.extend)
	    SVG.extend(initializer, config.extend)

	  // Attach construct method to parent
	  if (config.construct)
	    SVG.extend(config.parent || SVG.Container, config.construct)

	  return initializer
	}

	// Adopt existing svg elements
	SVG.adopt = function(node) {
	  // check for presence of node
	  if (!node) return null

	  // make sure a node isn't already adopted
	  if (node.instance) return node.instance

	  // initialize variables
	  var element

	  // adopt with element-specific settings
	  if (node.nodeName == 'svg')
	    element = node.parentNode instanceof SVGElement ? new SVG.Nested : new SVG.Doc
	  else if (node.nodeName == 'linearGradient')
	    element = new SVG.Gradient('linear')
	  else if (node.nodeName == 'radialGradient')
	    element = new SVG.Gradient('radial')
	  else if (SVG[capitalize(node.nodeName)])
	    element = new SVG[capitalize(node.nodeName)]
	  else
	    element = new SVG.Element(node)

	  // ensure references
	  element.type  = node.nodeName
	  element.node  = node
	  node.instance = element

	  // SVG.Class specific preparations
	  if (element instanceof SVG.Doc)
	    element.namespace().defs()

	  // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
	  element.setData(JSON.parse(node.getAttribute('svgjs:data')) || {})

	  return element
	}

	// Initialize parsing element
	SVG.prepare = function() {
	  // Select document body and create invisible svg element
	  var body = document.getElementsByTagName('body')[0]
	    , draw = (body ? new SVG.Doc(body) :  new SVG.Doc(document.documentElement).nested()).size(2, 0)

	  // Create parser object
	  SVG.parser = {
	    body: body || document.documentElement
	  , draw: draw.style('opacity:0;position:fixed;left:100%;top:100%;overflow:hidden')
	  , poly: draw.polyline().node
	  , path: draw.path().node
	  , native: SVG.create('svg')
	  }
	}

	SVG.parser = {
	  native: SVG.create('svg')
	}

	document.addEventListener('DOMContentLoaded', function() {
	  if(!SVG.parser.draw)
	    SVG.prepare()
	}, false)

	// Storage for regular expressions
	SVG.regex = {
	  // Parse unit value
	  numberAndUnit:    /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i

	  // Parse hex value
	, hex:              /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

	  // Parse rgb value
	, rgb:              /rgb\((\d+),(\d+),(\d+)\)/

	  // Parse reference id
	, reference:        /#([a-z0-9\-_]+)/i

	  // Parse matrix wrapper
	, matrix:           /matrix\(|\)/g

	  // Elements of a matrix
	, matrixElements:   /,*\s+|,/

	  // Whitespace
	, whitespace:       /\s/g

	  // Test hex value
	, isHex:            /^#[a-f0-9]{3,6}$/i

	  // Test rgb value
	, isRgb:            /^rgb\(/

	  // Test css declaration
	, isCss:            /[^:]+:[^;]+;?/

	  // Test for blank string
	, isBlank:          /^(\s+)?$/

	  // Test for numeric string
	, isNumber:         /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

	  // Test for percent value
	, isPercent:        /^-?[\d\.]+%$/

	  // Test for image url
	, isImage:          /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i

	  // The following regex are used to parse the d attribute of a path

	  // Replaces all negative exponents
	, negExp:           /e\-/gi

	  // Replaces all comma
	, comma:            /,/g

	  // Replaces all hyphens
	, hyphen:           /\-/g

	  // Replaces and tests for all path letters
	, pathLetters:      /[MLHVCSQTAZ]/gi

	  // yes we need this one, too
	, isPathLetter:     /[MLHVCSQTAZ]/i

	  // split at whitespaces
	, whitespaces:      /\s+/

	  // matches X
	, X:                /X/g
	}

	SVG.utils = {
	  // Map function
	  map: function(array, block) {
	    var i
	      , il = array.length
	      , result = []

	    for (i = 0; i < il; i++)
	      result.push(block(array[i]))

	    return result
	  }

	  // Filter function
	, filter: function(array, block) {
	    var i
	      , il = array.length
	      , result = []

	    for (i = 0; i < il; i++)
	      if (block(array[i]))
	        result.push(array[i])

	    return result
	  }

	  // Degrees to radians
	, radians: function(d) {
	    return d % 360 * Math.PI / 180
	  }

	  // Radians to degrees
	, degrees: function(r) {
	    return r * 180 / Math.PI % 360
	  }

	, filterSVGElements: function(nodes) {
	    return this.filter( nodes, function(el) { return el instanceof SVGElement })
	  }

	}

	SVG.defaults = {
	  // Default attribute values
	  attrs: {
	    // fill and stroke
	    'fill-opacity':     1
	  , 'stroke-opacity':   1
	  , 'stroke-width':     0
	  , 'stroke-linejoin':  'miter'
	  , 'stroke-linecap':   'butt'
	  , fill:               '#000000'
	  , stroke:             '#000000'
	  , opacity:            1
	    // position
	  , x:                  0
	  , y:                  0
	  , cx:                 0
	  , cy:                 0
	    // size
	  , width:              0
	  , height:             0
	    // radius
	  , r:                  0
	  , rx:                 0
	  , ry:                 0
	    // gradient
	  , offset:             0
	  , 'stop-opacity':     1
	  , 'stop-color':       '#000000'
	    // text
	  , 'font-size':        16
	  , 'font-family':      'Helvetica, Arial, sans-serif'
	  , 'text-anchor':      'start'
	  }

	}
	// Module for color convertions
	SVG.Color = function(color) {
	  var match

	  // initialize defaults
	  this.r = 0
	  this.g = 0
	  this.b = 0

	  if(!color) return

	  // parse color
	  if (typeof color === 'string') {
	    if (SVG.regex.isRgb.test(color)) {
	      // get rgb values
	      match = SVG.regex.rgb.exec(color.replace(/\s/g,''))

	      // parse numeric values
	      this.r = parseInt(match[1])
	      this.g = parseInt(match[2])
	      this.b = parseInt(match[3])

	    } else if (SVG.regex.isHex.test(color)) {
	      // get hex values
	      match = SVG.regex.hex.exec(fullHex(color))

	      // parse numeric values
	      this.r = parseInt(match[1], 16)
	      this.g = parseInt(match[2], 16)
	      this.b = parseInt(match[3], 16)

	    }

	  } else if (typeof color === 'object') {
	    this.r = color.r
	    this.g = color.g
	    this.b = color.b

	  }

	}

	SVG.extend(SVG.Color, {
	  // Default to hex conversion
	  toString: function() {
	    return this.toHex()
	  }
	  // Build hex value
	, toHex: function() {
	    return '#'
	      + compToHex(this.r)
	      + compToHex(this.g)
	      + compToHex(this.b)
	  }
	  // Build rgb value
	, toRgb: function() {
	    return 'rgb(' + [this.r, this.g, this.b].join() + ')'
	  }
	  // Calculate true brightness
	, brightness: function() {
	    return (this.r / 255 * 0.30)
	         + (this.g / 255 * 0.59)
	         + (this.b / 255 * 0.11)
	  }
	  // Make color morphable
	, morph: function(color) {
	    this.destination = new SVG.Color(color)

	    return this
	  }
	  // Get morphed color at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    // normalise pos
	    pos = pos < 0 ? 0 : pos > 1 ? 1 : pos

	    // generate morphed color
	    return new SVG.Color({
	      r: ~~(this.r + (this.destination.r - this.r) * pos)
	    , g: ~~(this.g + (this.destination.g - this.g) * pos)
	    , b: ~~(this.b + (this.destination.b - this.b) * pos)
	    })
	  }

	})

	// Testers

	// Test if given value is a color string
	SVG.Color.test = function(color) {
	  color += ''
	  return SVG.regex.isHex.test(color)
	      || SVG.regex.isRgb.test(color)
	}

	// Test if given value is a rgb object
	SVG.Color.isRgb = function(color) {
	  return color && typeof color.r == 'number'
	               && typeof color.g == 'number'
	               && typeof color.b == 'number'
	}

	// Test if given value is a color
	SVG.Color.isColor = function(color) {
	  return SVG.Color.isRgb(color) || SVG.Color.test(color)
	}
	// Module for array conversion
	SVG.Array = function(array, fallback) {
	  array = (array || []).valueOf()

	  // if array is empty and fallback is provided, use fallback
	  if (array.length == 0 && fallback)
	    array = fallback.valueOf()

	  // parse array
	  this.value = this.parse(array)
	}

	SVG.extend(SVG.Array, {
	  // Make array morphable
	  morph: function(array) {
	    this.destination = this.parse(array)

	    // normalize length of arrays
	    if (this.value.length != this.destination.length) {
	      var lastValue       = this.value[this.value.length - 1]
	        , lastDestination = this.destination[this.destination.length - 1]

	      while(this.value.length > this.destination.length)
	        this.destination.push(lastDestination)
	      while(this.value.length < this.destination.length)
	        this.value.push(lastValue)
	    }

	    return this
	  }
	  // Clean up any duplicate points
	, settle: function() {
	    // find all unique values
	    for (var i = 0, il = this.value.length, seen = []; i < il; i++)
	      if (seen.indexOf(this.value[i]) == -1)
	        seen.push(this.value[i])

	    // set new value
	    return this.value = seen
	  }
	  // Get morphed array at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    // generate morphed array
	    for (var i = 0, il = this.value.length, array = []; i < il; i++)
	      array.push(this.value[i] + (this.destination[i] - this.value[i]) * pos)

	    return new SVG.Array(array)
	  }
	  // Convert array to string
	, toString: function() {
	    return this.value.join(' ')
	  }
	  // Real value
	, valueOf: function() {
	    return this.value
	  }
	  // Parse whitespace separated string
	, parse: function(array) {
	    array = array.valueOf()

	    // if already is an array, no need to parse it
	    if (Array.isArray(array)) return array

	    return this.split(array)
	  }
	  // Strip unnecessary whitespace
	, split: function(string) {
	    return string.trim().split(/\s+/)
	  }
	  // Reverse array
	, reverse: function() {
	    this.value.reverse()

	    return this
	  }

	})
	// Poly points array
	SVG.PointArray = function(array, fallback) {
	  this.constructor.call(this, array, fallback || [[0,0]])
	}

	// Inherit from SVG.Array
	SVG.PointArray.prototype = new SVG.Array

	SVG.extend(SVG.PointArray, {
	  // Convert array to string
	  toString: function() {
	    // convert to a poly point string
	    for (var i = 0, il = this.value.length, array = []; i < il; i++)
	      array.push(this.value[i].join(','))

	    return array.join(' ')
	  }
	  // Convert array to line object
	, toLine: function() {
	    return {
	      x1: this.value[0][0]
	    , y1: this.value[0][1]
	    , x2: this.value[1][0]
	    , y2: this.value[1][1]
	    }
	  }
	  // Get morphed array at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    // generate morphed point string
	    for (var i = 0, il = this.value.length, array = []; i < il; i++)
	      array.push([
	        this.value[i][0] + (this.destination[i][0] - this.value[i][0]) * pos
	      , this.value[i][1] + (this.destination[i][1] - this.value[i][1]) * pos
	      ])

	    return new SVG.PointArray(array)
	  }
	  // Parse point string
	, parse: function(array) {
	    var points = []

	    array = array.valueOf()

	    // if already is an array, no need to parse it
	    if (Array.isArray(array)) return array

	    // parse points
	    array = array.trim().split(/\s+|,/)

	    // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
	    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.
	    if (array.length % 2 !== 0) array.pop()

	    // wrap points in two-tuples and parse points as floats
	    for(var i = 0, len = array.length; i < len; i = i + 2)
	      points.push([ parseFloat(array[i]), parseFloat(array[i+1]) ])

	    return points
	  }
	  // Move point string
	, move: function(x, y) {
	    var box = this.bbox()

	    // get relative offset
	    x -= box.x
	    y -= box.y

	    // move every point
	    if (!isNaN(x) && !isNaN(y))
	      for (var i = this.value.length - 1; i >= 0; i--)
	        this.value[i] = [this.value[i][0] + x, this.value[i][1] + y]

	    return this
	  }
	  // Resize poly string
	, size: function(width, height) {
	    var i, box = this.bbox()

	    // recalculate position of all points according to new size
	    for (i = this.value.length - 1; i >= 0; i--) {
	      this.value[i][0] = ((this.value[i][0] - box.x) * width)  / box.width  + box.x
	      this.value[i][1] = ((this.value[i][1] - box.y) * height) / box.height + box.y
	    }

	    return this
	  }
	  // Get bounding box of points
	, bbox: function() {
	    SVG.parser.poly.setAttribute('points', this.toString())

	    return SVG.parser.poly.getBBox()
	  }

	})
	// Path points array
	SVG.PathArray = function(array, fallback) {
	  this.constructor.call(this, array, fallback || [['M', 0, 0]])
	}

	// Inherit from SVG.Array
	SVG.PathArray.prototype = new SVG.Array

	SVG.extend(SVG.PathArray, {
	  // Convert array to string
	  toString: function() {
	    return arrayToString(this.value)
	  }
	  // Move path string
	, move: function(x, y) {
	    // get bounding box of current situation
	    var box = this.bbox()

	    // get relative offset
	    x -= box.x
	    y -= box.y

	    if (!isNaN(x) && !isNaN(y)) {
	      // move every point
	      for (var l, i = this.value.length - 1; i >= 0; i--) {
	        l = this.value[i][0]

	        if (l == 'M' || l == 'L' || l == 'T')  {
	          this.value[i][1] += x
	          this.value[i][2] += y

	        } else if (l == 'H')  {
	          this.value[i][1] += x

	        } else if (l == 'V')  {
	          this.value[i][1] += y

	        } else if (l == 'C' || l == 'S' || l == 'Q')  {
	          this.value[i][1] += x
	          this.value[i][2] += y
	          this.value[i][3] += x
	          this.value[i][4] += y

	          if (l == 'C')  {
	            this.value[i][5] += x
	            this.value[i][6] += y
	          }

	        } else if (l == 'A')  {
	          this.value[i][6] += x
	          this.value[i][7] += y
	        }

	      }
	    }

	    return this
	  }
	  // Resize path string
	, size: function(width, height) {
	    // get bounding box of current situation
	    var i, l, box = this.bbox()

	    // recalculate position of all points according to new size
	    for (i = this.value.length - 1; i >= 0; i--) {
	      l = this.value[i][0]

	      if (l == 'M' || l == 'L' || l == 'T')  {
	        this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
	        this.value[i][2] = ((this.value[i][2] - box.y) * height) / box.height + box.y

	      } else if (l == 'H')  {
	        this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x

	      } else if (l == 'V')  {
	        this.value[i][1] = ((this.value[i][1] - box.y) * height) / box.height + box.y

	      } else if (l == 'C' || l == 'S' || l == 'Q')  {
	        this.value[i][1] = ((this.value[i][1] - box.x) * width)  / box.width  + box.x
	        this.value[i][2] = ((this.value[i][2] - box.y) * height) / box.height + box.y
	        this.value[i][3] = ((this.value[i][3] - box.x) * width)  / box.width  + box.x
	        this.value[i][4] = ((this.value[i][4] - box.y) * height) / box.height + box.y

	        if (l == 'C')  {
	          this.value[i][5] = ((this.value[i][5] - box.x) * width)  / box.width  + box.x
	          this.value[i][6] = ((this.value[i][6] - box.y) * height) / box.height + box.y
	        }

	      } else if (l == 'A')  {
	        // resize radii
	        this.value[i][1] = (this.value[i][1] * width)  / box.width
	        this.value[i][2] = (this.value[i][2] * height) / box.height

	        // move position values
	        this.value[i][6] = ((this.value[i][6] - box.x) * width)  / box.width  + box.x
	        this.value[i][7] = ((this.value[i][7] - box.y) * height) / box.height + box.y
	      }

	    }

	    return this
	  }
	  // Test if the passed path array use the same path data commands as this path array
	, equalCommands: function(pathArray) {
	    var i, il, equalCommands

	    pathArray = new SVG.PathArray(pathArray)

	    equalCommands = this.value.length === pathArray.value.length
	    for(i = 0, il = this.value.length; equalCommands && i < il; i++) {
	      equalCommands = this.value[i][0] === pathArray.value[i][0]
	    }

	    return equalCommands
	  }
	  // Make path array morphable
	, morph: function(pathArray) {
	    pathArray = new SVG.PathArray(pathArray)

	    if(this.equalCommands(pathArray)) {
	      this.destination = pathArray
	    } else {
	      this.destination = null
	    }

	    return this
	  }
	  // Get morphed path array at given position
	, at: function(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this

	    var sourceArray = this.value
	      , destinationArray = this.destination.value
	      , array = [], pathArray = new SVG.PathArray()
	      , i, il, j, jl

	    // Animate has specified in the SVG spec
	    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement
	    for (i = 0, il = sourceArray.length; i < il; i++) {
	      array[i] = [sourceArray[i][0]]
	      for(j = 1, jl = sourceArray[i].length; j < jl; j++) {
	        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos
	      }
	      // For the two flags of the elliptical arc command, the SVG spec say:
	      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
	      // Elliptical arc command as an array followed by corresponding indexes:
	      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
	      //   0    1   2        3                 4             5      6  7
	      if(array[i][0] === 'A') {
	        array[i][4] = +(array[i][4] != 0)
	        array[i][5] = +(array[i][5] != 0)
	      }
	    }

	    // Directly modify the value of a path array, this is done this way for performance
	    pathArray.value = array
	    return pathArray
	  }
	  // Absolutize and parse path to array
	, parse: function(array) {
	    // if it's already a patharray, no need to parse it
	    if (array instanceof SVG.PathArray) return array.valueOf()

	    // prepare for parsing
	    var i, x0, y0, s, seg, arr
	      , x = 0
	      , y = 0
	      , paramCnt = { 'M':2, 'L':2, 'H':1, 'V':1, 'C':6, 'S':4, 'Q':4, 'T':2, 'A':7 }

	    if(typeof array == 'string'){

	      array = array
	        .replace(SVG.regex.negExp, 'X')         // replace all negative exponents with certain char
	        .replace(SVG.regex.pathLetters, ' $& ') // put some room between letters and numbers
	        .replace(SVG.regex.hyphen, ' -')        // add space before hyphen
	        .replace(SVG.regex.comma, ' ')          // unify all spaces
	        .replace(SVG.regex.X, 'e-')             // add back the expoent
	        .trim()                                 // trim
	        .split(SVG.regex.whitespaces)           // split into array

	      // at this place there could be parts like ['3.124.854.32'] because we could not determine the point as seperator till now
	      // we fix this elements in the next loop
	      for(i = array.length; --i;){
	        if(array[i].indexOf('.') != array[i].lastIndexOf('.')){
	          var split = array[i].split('.') // split at the point
	          var first = [split.shift(), split.shift()].join('.') // join the first number together
	          array.splice.apply(array, [i, 1].concat(first, split.map(function(el){ return '.'+el }))) // add first and all other entries back to array
	        }
	      }

	    }else{
	      array = array.reduce(function(prev, curr){
	        return [].concat.apply(prev, curr)
	      }, [])
	    }

	    // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]

	    var arr = []

	    do{

	      // Test if we have a path letter
	      if(SVG.regex.isPathLetter.test(array[0])){
	        s = array[0]
	        array.shift()
	      // If last letter was a move command and we got no new, it defaults to [L]ine
	      }else if(s == 'M'){
	        s = 'L'
	      }else if(s == 'm'){
	        s = 'l'
	      }

	      // add path letter as first element
	      seg = [s.toUpperCase()]

	      // push all necessary parameters to segment
	      for(i = 0; i < paramCnt[seg[0]]; ++i){
	        seg.push(parseFloat(array.shift()))
	      }

	      // upper case
	      if(s == seg[0]){

	        if(s == 'M' || s == 'L' || s == 'C' || s == 'Q' || s == 'S' || s == 'T'){
	          x = seg[paramCnt[seg[0]]-1]
	          y = seg[paramCnt[seg[0]]]
	        }else if(s == 'V'){
	          y = seg[1]
	        }else if(s == 'H'){
	          x = seg[1]
	        }else if(s == 'A'){
	          x = seg[6]
	          y = seg[7]
	        }

	      // lower case
	      }else{

	        // convert relative to absolute values
	        if(s == 'm' || s == 'l' || s == 'c' || s == 's' || s == 'q' || s == 't'){

	          seg[1] += x
	          seg[2] += y

	          if(seg[3] != null){
	            seg[3] += x
	            seg[4] += y
	          }

	          if(seg[5] != null){
	            seg[5] += x
	            seg[6] += y
	          }

	          // move pointer
	          x = seg[paramCnt[seg[0]]-1]
	          y = seg[paramCnt[seg[0]]]

	        }else if(s == 'v'){
	          seg[1] += y
	          y = seg[1]
	        }else if(s == 'h'){
	          seg[1] += x
	          x = seg[1]
	        }else if(s == 'a'){
	          seg[6] += x
	          seg[7] += y
	          x = seg[6]
	          y = seg[7]
	        }

	      }

	      if(seg[0] == 'M'){
	        x0 = x
	        y0 = y
	      }

	      if(seg[0] == 'Z'){
	        x = x0
	        y = y0
	      }

	      arr.push(seg)

	    }while(array.length)

	    return arr

	  }
	  // Get bounding box of path
	, bbox: function() {
	    SVG.parser.path.setAttribute('d', this.toString())

	    return SVG.parser.path.getBBox()
	  }

	})

	// Module for unit convertions
	SVG.Number = SVG.invent({
	  // Initialize
	  create: function(value, unit) {
	    // initialize defaults
	    this.value = 0
	    this.unit  = unit || ''

	    // parse value
	    if (typeof value === 'number') {
	      // ensure a valid numeric value
	      this.value = isNaN(value) ? 0 : !isFinite(value) ? (value < 0 ? -3.4e+38 : +3.4e+38) : value

	    } else if (typeof value === 'string') {
	      unit = value.match(SVG.regex.numberAndUnit)

	      if (unit) {
	        // make value numeric
	        this.value = parseFloat(unit[1])

	        // normalize
	        if (unit[5] == '%')
	          this.value /= 100
	        else if (unit[5] == 's')
	          this.value *= 1000

	        // store unit
	        this.unit = unit[5]
	      }

	    } else {
	      if (value instanceof SVG.Number) {
	        this.value = value.valueOf()
	        this.unit  = value.unit
	      }
	    }

	  }
	  // Add methods
	, extend: {
	    // Stringalize
	    toString: function() {
	      return (
	        this.unit == '%' ?
	          ~~(this.value * 1e8) / 1e6:
	        this.unit == 's' ?
	          this.value / 1e3 :
	          this.value
	      ) + this.unit
	    }
	  , toJSON: function() {
	      return this.toString()
	    }
	  , // Convert to primitive
	    valueOf: function() {
	      return this.value
	    }
	    // Add number
	  , plus: function(number) {
	      return new SVG.Number(this + new SVG.Number(number), this.unit)
	    }
	    // Subtract number
	  , minus: function(number) {
	      return this.plus(-new SVG.Number(number))
	    }
	    // Multiply number
	  , times: function(number) {
	      return new SVG.Number(this * new SVG.Number(number), this.unit)
	    }
	    // Divide number
	  , divide: function(number) {
	      return new SVG.Number(this / new SVG.Number(number), this.unit)
	    }
	    // Convert to different unit
	  , to: function(unit) {
	      var number = new SVG.Number(this)

	      if (typeof unit === 'string')
	        number.unit = unit

	      return number
	    }
	    // Make number morphable
	  , morph: function(number) {
	      this.destination = new SVG.Number(number)

	      return this
	    }
	    // Get morphed number at given position
	  , at: function(pos) {
	      // Make sure a destination is defined
	      if (!this.destination) return this

	      // Generate new morphed number
	      return new SVG.Number(this.destination)
	          .minus(this)
	          .times(pos)
	          .plus(this)
	    }

	  }
	})

	SVG.Element = SVG.invent({
	  // Initialize node
	  create: function(node) {
	    // make stroke value accessible dynamically
	    this._stroke = SVG.defaults.attrs.stroke

	    // initialize data object
	    this.dom = {}

	    // create circular reference
	    if (this.node = node) {
	      this.type = node.nodeName
	      this.node.instance = this

	      // store current attribute value
	      this._stroke = node.getAttribute('stroke') || this._stroke
	    }
	  }

	  // Add class methods
	, extend: {
	    // Move over x-axis
	    x: function(x) {
	      return this.attr('x', x)
	    }
	    // Move over y-axis
	  , y: function(y) {
	      return this.attr('y', y)
	    }
	    // Move by center over x-axis
	  , cx: function(x) {
	      return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2)
	    }
	    // Move by center over y-axis
	  , cy: function(y) {
	      return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2)
	    }
	    // Move element to given x and y values
	  , move: function(x, y) {
	      return this.x(x).y(y)
	    }
	    // Move element by its center
	  , center: function(x, y) {
	      return this.cx(x).cy(y)
	    }
	    // Set width of element
	  , width: function(width) {
	      return this.attr('width', width)
	    }
	    // Set height of element
	  , height: function(height) {
	      return this.attr('height', height)
	    }
	    // Set element size to given width and height
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this
	        .width(new SVG.Number(p.width))
	        .height(new SVG.Number(p.height))
	    }
	    // Clone element
	  , clone: function(parent) {
	      // clone element and assign new id
	      var clone = assignNewId(this.node.cloneNode(true))

	      // insert the clone in the given parent or after myself
	      if(parent) parent.add(clone)
	      else this.after(clone)

	      return clone
	    }
	    // Remove element
	  , remove: function() {
	      if (this.parent())
	        this.parent().removeElement(this)

	      return this
	    }
	    // Replace element
	  , replace: function(element) {
	      this.after(element).remove()

	      return element
	    }
	    // Add element to given container and return self
	  , addTo: function(parent) {
	      return parent.put(this)
	    }
	    // Add element to given container and return container
	  , putIn: function(parent) {
	      return parent.add(this)
	    }
	    // Get / set id
	  , id: function(id) {
	      return this.attr('id', id)
	    }
	    // Checks whether the given point inside the bounding box of the element
	  , inside: function(x, y) {
	      var box = this.bbox()

	      return x > box.x
	          && y > box.y
	          && x < box.x + box.width
	          && y < box.y + box.height
	    }
	    // Show element
	  , show: function() {
	      return this.style('display', '')
	    }
	    // Hide element
	  , hide: function() {
	      return this.style('display', 'none')
	    }
	    // Is element visible?
	  , visible: function() {
	      return this.style('display') != 'none'
	    }
	    // Return id on string conversion
	  , toString: function() {
	      return this.attr('id')
	    }
	    // Return array of classes on the node
	  , classes: function() {
	      var attr = this.attr('class')

	      return attr == null ? [] : attr.trim().split(/\s+/)
	    }
	    // Return true if class exists on the node, false otherwise
	  , hasClass: function(name) {
	      return this.classes().indexOf(name) != -1
	    }
	    // Add class to the node
	  , addClass: function(name) {
	      if (!this.hasClass(name)) {
	        var array = this.classes()
	        array.push(name)
	        this.attr('class', array.join(' '))
	      }

	      return this
	    }
	    // Remove class from the node
	  , removeClass: function(name) {
	      if (this.hasClass(name)) {
	        this.attr('class', this.classes().filter(function(c) {
	          return c != name
	        }).join(' '))
	      }

	      return this
	    }
	    // Toggle the presence of a class on the node
	  , toggleClass: function(name) {
	      return this.hasClass(name) ? this.removeClass(name) : this.addClass(name)
	    }
	    // Get referenced element form attribute value
	  , reference: function(attr) {
	      return SVG.get(this.attr(attr))
	    }
	    // Returns the parent element instance
	  , parent: function(type) {
	      var parent = this

	      // check for parent
	      if(!parent.node.parentNode) return null

	      // get parent element
	      parent = SVG.adopt(parent.node.parentNode)

	      if(!type) return parent

	      // loop trough ancestors if type is given
	      while(parent && parent.node instanceof SVGElement){
	        if(typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent
	        parent = SVG.adopt(parent.node.parentNode)
	      }
	    }
	    // Get parent document
	  , doc: function() {
	      return this instanceof SVG.Doc ? this : this.parent(SVG.Doc)
	    }
	    // return array of all ancestors of given type up to the root svg
	  , parents: function(type) {
	      var parents = [], parent = this

	      do{
	        parent = parent.parent(type)
	        if(!parent || !parent.node) break

	        parents.push(parent)
	      } while(parent.parent)

	      return parents
	    }
	    // matches the element vs a css selector
	  , matches: function(selector){
	      return matches(this.node, selector)
	    }
	    // Returns the svg node to call native svg methods on it
	  , native: function() {
	      return this.node
	    }
	    // Import raw svg
	  , svg: function(svg) {
	      // create temporary holder
	      var well = document.createElement('svg')

	      // act as a setter if svg is given
	      if (svg && this instanceof SVG.Parent) {
	        // dump raw svg
	        well.innerHTML = '<svg>' + svg.replace(/\n/, '').replace(/<(\w+)([^<]+?)\/>/g, '<$1$2></$1>') + '</svg>'

	        // transplant nodes
	        for (var i = 0, il = well.firstChild.childNodes.length; i < il; i++)
	          this.node.appendChild(well.firstChild.firstChild)

	      // otherwise act as a getter
	      } else {
	        // create a wrapping svg element in case of partial content
	        well.appendChild(svg = document.createElement('svg'))

	        // write svgjs data to the dom
	        this.writeDataToDom()

	        // insert a copy of this node
	        svg.appendChild(this.node.cloneNode(true))

	        // return target element
	        return well.innerHTML.replace(/^<svg>/, '').replace(/<\/svg>$/, '')
	      }

	      return this
	    }
	  // write svgjs data to the dom
	  , writeDataToDom: function() {

	      // dump variables recursively
	      if(this.each || this.lines){
	        var fn = this.each ? this : this.lines();
	        fn.each(function(){
	          this.writeDataToDom()
	        })
	      }

	      // remove previously set data
	      this.node.removeAttribute('svgjs:data')

	      if(Object.keys(this.dom).length)
	        this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)) // see #428

	      return this
	    }
	  // set given data to the elements data property
	  , setData: function(o){
	      this.dom = o
	      return this
	    }
	  , is: function(obj){
	      return is(this, obj)
	    }
	  }
	})

	SVG.easing = {
	  '-': function(pos){return pos}
	, '<>':function(pos){return -Math.cos(pos * Math.PI) / 2 + 0.5}
	, '>': function(pos){return  Math.sin(pos * Math.PI / 2)}
	, '<': function(pos){return -Math.cos(pos * Math.PI / 2) + 1}
	}

	SVG.morph = function(pos){
	  return function(from, to) {
	    return new SVG.MorphObj(from, to).at(pos)
	  }
	}

	SVG.Situation = SVG.invent({

	  create: function(o){
	    this.init = false
	    this.reversed = false
	    this.reversing = false

	    this.duration = new SVG.Number(o.duration).valueOf()
	    this.delay = new SVG.Number(o.delay).valueOf()

	    this.start = +new Date() + this.delay
	    this.finish = this.start + this.duration
	    this.ease = o.ease

	    // this.loop is incremented from 0 to this.loops
	    // it is also incremented when in an infinite loop (when this.loops is true)
	    this.loop = 0
	    this.loops = false

	    this.animations = {
	      // functionToCall: [list of morphable objects]
	      // e.g. move: [SVG.Number, SVG.Number]
	    }

	    this.attrs = {
	      // holds all attributes which are not represented from a function svg.js provides
	      // e.g. someAttr: SVG.Number
	    }

	    this.styles = {
	      // holds all styles which should be animated
	      // e.g. fill-color: SVG.Color
	    }

	    this.transforms = [
	      // holds all transformations as transformation objects
	      // e.g. [SVG.Rotate, SVG.Translate, SVG.Matrix]
	    ]

	    this.once = {
	      // functions to fire at a specific position
	      // e.g. "0.5": function foo(){}
	    }

	  }

	})


	SVG.FX = SVG.invent({

	  create: function(element) {
	    this._target = element
	    this.situations = []
	    this.active = false
	    this.situation = null
	    this.paused = false
	    this.lastPos = 0
	    this.pos = 0
	    // The absolute position of an animation is its position in the context of its complete duration (including delay and loops)
	    // When performing a delay, absPos is below 0 and when performing a loop, its value is above 1
	    this.absPos = 0
	    this._speed = 1
	  }

	, extend: {

	    /**
	     * sets or returns the target of this animation
	     * @param o object || number In case of Object it holds all parameters. In case of number its the duration of the animation
	     * @param ease function || string Function which should be used for easing or easing keyword
	     * @param delay Number indicating the delay before the animation starts
	     * @return target || this
	     */
	    animate: function(o, ease, delay){

	      if(typeof o == 'object'){
	        ease = o.ease
	        delay = o.delay
	        o = o.duration
	      }

	      var situation = new SVG.Situation({
	        duration: o || 1000,
	        delay: delay || 0,
	        ease: SVG.easing[ease || '-'] || ease
	      })

	      this.queue(situation)

	      return this
	    }

	    /**
	     * sets a delay before the next element of the queue is called
	     * @param delay Duration of delay in milliseconds
	     * @return this.target()
	     */
	  , delay: function(delay){
	      // The delay is performed by an empty situation with its duration
	      // attribute set to the duration of the delay
	      var situation = new SVG.Situation({
	        duration: delay,
	        delay: 0,
	        ease: SVG.easing['-']
	      })

	      return this.queue(situation)
	    }

	    /**
	     * sets or returns the target of this animation
	     * @param null || target SVG.Element which should be set as new target
	     * @return target || this
	     */
	  , target: function(target){
	      if(target && target instanceof SVG.Element){
	        this._target = target
	        return this
	      }

	      return this._target
	    }

	    // returns the absolute position at a given time
	  , timeToAbsPos: function(timestamp){
	      return (timestamp - this.situation.start) / (this.situation.duration/this._speed)
	    }

	    // returns the timestamp from a given absolute positon
	  , absPosToTime: function(absPos){
	      return this.situation.duration/this._speed * absPos + this.situation.start
	    }

	    // starts the animationloop
	  , startAnimFrame: function(){
	      this.stopAnimFrame()
	      this.animationFrame = requestAnimationFrame(function(){ this.step() }.bind(this))
	    }

	    // cancels the animationframe
	  , stopAnimFrame: function(){
	      cancelAnimationFrame(this.animationFrame)
	    }

	    // kicks off the animation - only does something when the queue is currently not active and at least one situation is set
	  , start: function(){
	      // dont start if already started
	      if(!this.active && this.situation){
	        this.active = true
	        this.startCurrent()
	      }

	      return this
	    }

	    // start the current situation
	  , startCurrent: function(){
	      this.situation.start = +new Date + this.situation.delay/this._speed
	      this.situation.finish = this.situation.start + this.situation.duration/this._speed
	      return this.initAnimations().step()
	    }

	    /**
	     * adds a function / Situation to the animation queue
	     * @param fn function / situation to add
	     * @return this
	     */
	  , queue: function(fn){
	      if(typeof fn == 'function' || fn instanceof SVG.Situation)
	        this.situations.push(fn)

	      if(!this.situation) this.situation = this.situations.shift()

	      return this
	    }

	    /**
	     * pulls next element from the queue and execute it
	     * @return this
	     */
	  , dequeue: function(){
	      // stop current animation
	      this.situation && this.situation.stop && this.situation.stop()

	      // get next animation from queue
	      this.situation = this.situations.shift()

	      if(this.situation){
	        if(this.situation instanceof SVG.Situation) {
	          this.startCurrent()
	        } else {
	          // If it is not a SVG.Situation, then it is a function, we execute it
	          this.situation.call(this)
	        }
	      }

	      return this
	    }

	    // updates all animations to the current state of the element
	    // this is important when one property could be changed from another property
	  , initAnimations: function() {
	      var i
	      var s = this.situation

	      if(s.init) return this

	      for(i in s.animations){

	        if(i == 'viewbox'){
	          s.animations[i] = this.target().viewbox().morph(s.animations[i])
	        }else{

	          // TODO: this is not a clean clone of the array. We may have some unchecked references
	          s.animations[i].value = (i == 'plot' ? this.target().array().value : this.target()[i]())

	          // sometimes we get back an object and not the real value, fix this
	          if(s.animations[i].value.value){
	            s.animations[i].value = s.animations[i].value.value
	          }

	          if(s.animations[i].relative)
	            s.animations[i].destination.value = s.animations[i].destination.value + s.animations[i].value

	        }

	      }

	      for(i in s.attrs){
	        if(s.attrs[i] instanceof SVG.Color){
	          var color = new SVG.Color(this.target().attr(i))
	          s.attrs[i].r = color.r
	          s.attrs[i].g = color.g
	          s.attrs[i].b = color.b
	        }else{
	          s.attrs[i].value = this.target().attr(i)// + s.attrs[i].value
	        }
	      }

	      for(i in s.styles){
	        s.styles[i].value = this.target().style(i)
	      }

	      s.initialTransformation = this.target().matrixify()

	      s.init = true
	      return this
	    }
	  , clearQueue: function(){
	      this.situations = []
	      return this
	    }
	  , clearCurrent: function(){
	      this.situation = null
	      return this
	    }
	    /** stops the animation immediately
	     * @param jumpToEnd A Boolean indicating whether to complete the current animation immediately.
	     * @param clearQueue A Boolean indicating whether to remove queued animation as well.
	     * @return this
	     */
	  , stop: function(jumpToEnd, clearQueue){
	      if(!this.active) this.start()

	      if(clearQueue){
	        this.clearQueue()
	      }

	      this.active = false

	      if(jumpToEnd && this.situation){
	        this.atEnd()
	      }

	      this.stopAnimFrame()

	      return this.clearCurrent()
	    }

	    /** resets the element to the state where the current element has started
	     * @return this
	     */
	  , reset: function(){
	      if(this.situation){
	        var temp = this.situation
	        this.stop()
	        this.situation = temp
	        this.atStart()
	      }
	      return this
	    }

	    // Stop the currently-running animation, remove all queued animations, and complete all animations for the element.
	  , finish: function(){

	      this.stop(true, false)

	      while(this.dequeue().situation && this.stop(true, false));

	      this.clearQueue().clearCurrent()

	      return this
	    }

	    // set the internal animation pointer at the start position, before any loops, and updates the visualisation
	  , atStart: function() {
	    return this.at(0, true)
	  }

	    // set the internal animation pointer at the end position, after all the loops, and updates the visualisation
	  , atEnd: function() {
	    if (this.situation.loops === true) {
	      // If in a infinite loop, we end the current iteration
	      return this.at(this.situation.loop+1, true)
	    } else if(typeof this.situation.loops == 'number') {
	      // If performing a finite number of loops, we go after all the loops
	      return this.at(this.situation.loops, true)
	    } else {
	      // If no loops, we just go at the end
	      return this.at(1, true)
	    }
	  }

	    // set the internal animation pointer to the specified position and updates the visualisation
	    // if isAbsPos is true, pos is treated as an absolute position
	  , at: function(pos, isAbsPos){
	      var durDivSpd = this.situation.duration/this._speed

	      this.absPos = pos
	      // If pos is not an absolute position, we convert it into one
	      if (!isAbsPos) {
	        if (this.situation.reversed) this.absPos = 1 - this.absPos
	        this.absPos += this.situation.loop
	      }

	      this.situation.start = +new Date - this.absPos * durDivSpd
	      this.situation.finish = this.situation.start + durDivSpd

	      return this.step(true)
	    }

	    /**
	     * sets or returns the speed of the animations
	     * @param speed null || Number The new speed of the animations
	     * @return Number || this
	     */
	  , speed: function(speed){
	      if (speed === 0) return this.pause()

	      if (speed) {
	        this._speed = speed
	        // We use an absolute position here so that speed can affect the delay before the animation
	        return this.at(this.absPos, true)
	      } else return this._speed
	    }

	    // Make loopable
	  , loop: function(times, reverse) {
	      var c = this.last()

	      // store total loops
	      c.loops = (times != null) ? times : true
	      c.loop = 0

	      if(reverse) c.reversing = true
	      return this
	    }

	    // pauses the animation
	  , pause: function(){
	      this.paused = true
	      this.stopAnimFrame()

	      return this
	    }

	    // unpause the animation
	  , play: function(){
	      if(!this.paused) return this
	      this.paused = false
	      // We use an absolute position here so that the delay before the animation can be paused
	      return this.at(this.absPos, true)
	    }

	    /**
	     * toggle or set the direction of the animation
	     * true sets direction to backwards while false sets it to forwards
	     * @param reversed Boolean indicating whether to reverse the animation or not (default: toggle the reverse status)
	     * @return this
	     */
	  , reverse: function(reversed){
	      var c = this.last()

	      if(typeof reversed == 'undefined') c.reversed = !c.reversed
	      else c.reversed = reversed

	      return this
	    }


	    /**
	     * returns a float from 0-1 indicating the progress of the current animation
	     * @param eased Boolean indicating whether the returned position should be eased or not
	     * @return number
	     */
	  , progress: function(easeIt){
	      return easeIt ? this.situation.ease(this.pos) : this.pos
	    }

	    /**
	     * adds a callback function which is called when the current animation is finished
	     * @param fn Function which should be executed as callback
	     * @return number
	     */
	  , after: function(fn){
	      var c = this.last()
	        , wrapper = function wrapper(e){
	            if(e.detail.situation == c){
	              fn.call(this, c)
	              this.off('finished.fx', wrapper) // prevent memory leak
	            }
	          }

	      this.target().on('finished.fx', wrapper)
	      return this
	    }

	    // adds a callback which is called whenever one animation step is performed
	  , during: function(fn){
	      var c = this.last()
	        , wrapper = function(e){
	            if(e.detail.situation == c){
	              fn.call(this, e.detail.pos, SVG.morph(e.detail.pos), e.detail.eased, c)
	            }
	          }

	      // see above
	      this.target().off('during.fx', wrapper).on('during.fx', wrapper)

	      return this.after(function(){
	        this.off('during.fx', wrapper)
	      })
	    }

	    // calls after ALL animations in the queue are finished
	  , afterAll: function(fn){
	      var wrapper = function wrapper(e){
	            fn.call(this)
	            this.off('allfinished.fx', wrapper)
	          }

	      // see above
	      this.target().off('allfinished.fx', wrapper).on('allfinished.fx', wrapper)
	      return this
	    }

	    // calls on every animation step for all animations
	  , duringAll: function(fn){
	      var wrapper = function(e){
	            fn.call(this, e.detail.pos, SVG.morph(e.detail.pos), e.detail.eased, e.detail.situation)
	          }

	      this.target().off('during.fx', wrapper).on('during.fx', wrapper)

	      return this.afterAll(function(){
	        this.off('during.fx', wrapper)
	      })
	    }

	  , last: function(){
	      return this.situations.length ? this.situations[this.situations.length-1] : this.situation
	    }

	    // adds one property to the animations
	  , add: function(method, args, type){
	      this.last()[type || 'animations'][method] = args
	      setTimeout(function(){this.start()}.bind(this), 0)
	      return this
	    }

	    /** perform one step of the animation
	     *  @param ignoreTime Boolean indicating whether to ignore time and use position directly or recalculate position based on time
	     *  @return this
	     */
	  , step: function(ignoreTime){

	      // convert current time to an absolute position
	      if(!ignoreTime) this.absPos = this.timeToAbsPos(+new Date)

	      // This part convert an absolute position to a position
	      if(this.situation.loops !== false) {
	        var absPos, absPosInt, lastLoop

	        // If the absolute position is below 0, we just treat it as if it was 0
	        absPos = Math.max(this.absPos, 0)
	        absPosInt = Math.floor(absPos)

	        if(this.situation.loops === true || absPosInt < this.situation.loops) {
	          this.pos = absPos - absPosInt
	          lastLoop = this.situation.loop
	          this.situation.loop = absPosInt
	        } else {
	          this.absPos = this.situation.loops
	          this.pos = 1
	          // The -1 here is because we don't want to toggle reversed when all the loops have been completed
	          lastLoop = this.situation.loop - 1
	          this.situation.loop = this.situation.loops
	        }

	        if(this.situation.reversing) {
	          // Toggle reversed if an odd number of loops as occured since the last call of step
	          this.situation.reversed = this.situation.reversed != Boolean((this.situation.loop - lastLoop) % 2)
	        }

	      } else {
	        // If there are no loop, the absolute position must not be above 1
	        this.absPos = Math.min(this.absPos, 1)
	        this.pos = this.absPos
	      }

	      // while the absolute position can be below 0, the position must not be below 0
	      if(this.pos < 0) this.pos = 0

	      if(this.situation.reversed) this.pos = 1 - this.pos


	      // apply easing
	      var eased = this.situation.ease(this.pos)

	      // call once-callbacks
	      for(var i in this.situation.once){
	        if(i > this.lastPos && i <= eased){
	          this.situation.once[i].call(this.target(), this.pos, eased)
	          delete this.situation.once[i]
	        }
	      }

	      // fire during callback with position, eased position and current situation as parameter
	      if(this.active) this.target().fire('during', {pos: this.pos, eased: eased, fx: this, situation: this.situation})

	      // the user may call stop or finish in the during callback
	      // so make sure that we still have a valid situation
	      if(!this.situation){
	        return this
	      }

	      // apply the actual animation to every property
	      this.eachAt()

	      // do final code when situation is finished
	      if((this.pos == 1 && !this.situation.reversed) || (this.situation.reversed && this.pos == 0)){

	        // stop animation callback
	        this.stopAnimFrame()

	        // fire finished callback with current situation as parameter
	        this.target().fire('finished', {fx:this, situation: this.situation})

	        if(!this.situations.length){
	          this.target().fire('allfinished')
	          this.target().off('.fx') // there shouldnt be any binding left, but to make sure...
	          this.active = false
	        }

	        // start next animation
	        if(this.active) this.dequeue()
	        else this.clearCurrent()

	      }else if(!this.paused && this.active){
	        // we continue animating when we are not at the end
	        this.startAnimFrame()
	      }

	      // save last eased position for once callback triggering
	      this.lastPos = eased
	      return this

	    }

	    // calculates the step for every property and calls block with it
	  , eachAt: function(){
	      var i, at, self = this, target = this.target(), s = this.situation

	      // apply animations which can be called trough a method
	      for(i in s.animations){

	        at = [].concat(s.animations[i]).map(function(el){
	          return typeof el !== 'string' && el.at ? el.at(s.ease(self.pos), self.pos) : el
	        })

	        target[i].apply(target, at)

	      }

	      // apply animation which has to be applied with attr()
	      for(i in s.attrs){

	        at = [i].concat(s.attrs[i]).map(function(el){
	          return typeof el !== 'string' && el.at ? el.at(s.ease(self.pos), self.pos) : el
	        })

	        target.attr.apply(target, at)

	      }

	      // apply animation which has to be applied with style()
	      for(i in s.styles){

	        at = [i].concat(s.styles[i]).map(function(el){
	          return typeof el !== 'string' && el.at ? el.at(s.ease(self.pos), self.pos) : el
	        })

	        target.style.apply(target, at)

	      }

	      // animate initialTransformation which has to be chained
	      if(s.transforms.length){

	        // get initial initialTransformation
	        at = s.initialTransformation
	        for(i = 0, len = s.transforms.length; i < len; i++){

	          // get next transformation in chain
	          var a = s.transforms[i]

	          // multiply matrix directly
	          if(a instanceof SVG.Matrix){

	            if(a.relative){
	              at = at.multiply(new SVG.Matrix().morph(a).at(s.ease(this.pos)))
	            }else{
	              at = at.morph(a).at(s.ease(this.pos))
	            }
	            continue
	          }

	          // when transformation is absolute we have to reset the needed transformation first
	          if(!a.relative)
	            a.undo(at.extract())

	          // and reapply it after
	          at = at.multiply(a.at(s.ease(this.pos)))

	        }

	        // set new matrix on element
	        target.matrix(at)
	      }

	      return this

	    }


	    // adds an once-callback which is called at a specific position and never again
	  , once: function(pos, fn, isEased){

	      if(!isEased)pos = this.situation.ease(pos)

	      this.situation.once[pos] = fn

	      return this
	    }

	  }

	, parent: SVG.Element

	  // Add method to parent elements
	, construct: {
	    // Get fx module or create a new one, then animate with given duration and ease
	    animate: function(o, ease, delay) {
	      return (this.fx || (this.fx = new SVG.FX(this))).animate(o, ease, delay)
	    }
	  , delay: function(delay){
	      return (this.fx || (this.fx = new SVG.FX(this))).delay(delay)
	    }
	  , stop: function(jumpToEnd, clearQueue) {
	      if (this.fx)
	        this.fx.stop(jumpToEnd, clearQueue)

	      return this
	    }
	  , finish: function() {
	      if (this.fx)
	        this.fx.finish()

	      return this
	    }
	    // Pause current animation
	  , pause: function() {
	      if (this.fx)
	        this.fx.pause()

	      return this
	    }
	    // Play paused current animation
	  , play: function() {
	      if (this.fx)
	        this.fx.play()

	      return this
	    }
	    // Set/Get the speed of the animations
	  , speed: function(speed) {
	      if (this.fx)
	        if (speed == null)
	          return this.fx.speed()
	        else
	          this.fx.speed(speed)

	      return this
	    }
	  }

	})

	// MorphObj is used whenever no morphable object is given
	SVG.MorphObj = SVG.invent({

	  create: function(from, to){
	    // prepare color for morphing
	    if(SVG.Color.isColor(to)) return new SVG.Color(from).morph(to)
	    // prepare number for morphing
	    if(SVG.regex.numberAndUnit.test(to)) return new SVG.Number(from).morph(to)

	    // prepare for plain morphing
	    this.value = 0
	    this.destination = to
	  }

	, extend: {
	    at: function(pos, real){
	      return real < 1 ? this.value : this.destination
	    },

	    valueOf: function(){
	      return this.value
	    }
	  }

	})

	SVG.extend(SVG.FX, {
	  // Add animatable attributes
	  attr: function(a, v, relative) {
	    // apply attributes individually
	    if (typeof a == 'object') {
	      for (var key in a)
	        this.attr(key, a[key])

	    } else {
	      // the MorphObj takes care about the right function used
	      this.add(a, new SVG.MorphObj(null, v), 'attrs')
	    }

	    return this
	  }
	  // Add animatable styles
	, style: function(s, v) {
	    if (typeof s == 'object')
	      for (var key in s)
	        this.style(key, s[key])

	    else
	      this.add(s, new SVG.MorphObj(null, v), 'styles')

	    return this
	  }
	  // Animatable x-axis
	, x: function(x, relative) {
	    if(this.target() instanceof SVG.G){
	      this.transform({x:x}, relative)
	      return this
	    }

	    var num = new SVG.Number().morph(x)
	    num.relative = relative
	    return this.add('x', num)
	  }
	  // Animatable y-axis
	, y: function(y, relative) {
	    if(this.target() instanceof SVG.G){
	      this.transform({y:y}, relative)
	      return this
	    }

	    var num = new SVG.Number().morph(y)
	    num.relative = relative
	    return this.add('y', num)
	  }
	  // Animatable center x-axis
	, cx: function(x) {
	    return this.add('cx', new SVG.Number().morph(x))
	  }
	  // Animatable center y-axis
	, cy: function(y) {
	    return this.add('cy', new SVG.Number().morph(y))
	  }
	  // Add animatable move
	, move: function(x, y) {
	    return this.x(x).y(y)
	  }
	  // Add animatable center
	, center: function(x, y) {
	    return this.cx(x).cy(y)
	  }
	  // Add animatable size
	, size: function(width, height) {
	    if (this.target() instanceof SVG.Text) {
	      // animate font size for Text elements
	      this.attr('font-size', width)

	    } else {
	      // animate bbox based size for all other elements
	      var box

	      if(!width || !height){
	        box = this.target().bbox()
	      }

	      if(!width){
	        width = box.width / box.height  * height
	      }

	      if(!height){
	        height = box.height / box.width  * width
	      }

	      this.add('width' , new SVG.Number().morph(width))
	          .add('height', new SVG.Number().morph(height))

	    }

	    return this
	  }
	  // Add animatable plot
	, plot: function(p) {
	    return this.add('plot', this.target().array().morph(p))
	  }
	  // Add leading method
	, leading: function(value) {
	    return this.target().leading ?
	      this.add('leading', new SVG.Number().morph(value)) :
	      this
	  }
	  // Add animatable viewbox
	, viewbox: function(x, y, width, height) {
	    if (this.target() instanceof SVG.Container) {
	      this.add('viewbox', new SVG.ViewBox(x, y, width, height))
	    }

	    return this
	  }
	, update: function(o) {
	    if (this.target() instanceof SVG.Stop) {
	      if (typeof o == 'number' || o instanceof SVG.Number) {
	        return this.update({
	          offset:  arguments[0]
	        , color:   arguments[1]
	        , opacity: arguments[2]
	        })
	      }

	      if (o.opacity != null) this.attr('stop-opacity', o.opacity)
	      if (o.color   != null) this.attr('stop-color', o.color)
	      if (o.offset  != null) this.attr('offset', o.offset)
	    }

	    return this
	  }
	})

	SVG.BBox = SVG.invent({
	  // Initialize
	  create: function(element) {
	    // get values if element is given
	    if (element) {
	      var box

	      // yes this is ugly, but Firefox can be a bitch when it comes to elements that are not yet rendered
	      try {

	        // the element is NOT in the dom, throw error
	        if(!document.documentElement.contains(element.node)) throw new Exception('Element not in the dom')

	        // find native bbox
	        box = element.node.getBBox()
	      } catch(e) {
	        if(element instanceof SVG.Shape){
	          var clone = element.clone(SVG.parser.draw).show()
	          box = clone.bbox()
	          clone.remove()
	        }else{
	          box = {
	            x:      element.node.clientLeft
	          , y:      element.node.clientTop
	          , width:  element.node.clientWidth
	          , height: element.node.clientHeight
	          }
	        }
	      }

	      // plain x and y
	      this.x = box.x
	      this.y = box.y

	      // plain width and height
	      this.width  = box.width
	      this.height = box.height
	    }

	    // add center, right and bottom
	    fullBox(this)
	  }

	  // Define Parent
	, parent: SVG.Element

	  // Constructor
	, construct: {
	    // Get bounding box
	    bbox: function() {
	      return new SVG.BBox(this)
	    }
	  }

	})

	SVG.TBox = SVG.invent({
	  // Initialize
	  create: function(element) {
	    // get values if element is given
	    if (element) {
	      var t   = element.ctm().extract()
	        , box = element.bbox()

	      // width and height including transformations
	      this.width  = box.width  * t.scaleX
	      this.height = box.height * t.scaleY

	      // x and y including transformations
	      this.x = box.x + t.x
	      this.y = box.y + t.y
	    }

	    // add center, right and bottom
	    fullBox(this)
	  }

	  // Define Parent
	, parent: SVG.Element

	  // Constructor
	, construct: {
	    // Get transformed bounding box
	    tbox: function() {
	      return new SVG.TBox(this)
	    }
	  }

	})


	SVG.RBox = SVG.invent({
	  // Initialize
	  create: function(element) {
	    if (element) {
	      var e    = element.doc().parent()
	        , box  = element.node.getBoundingClientRect()
	        , zoom = 1

	      // get screen offset
	      this.x = box.left
	      this.y = box.top

	      // subtract parent offset
	      this.x -= e.offsetLeft
	      this.y -= e.offsetTop

	      while (e = e.offsetParent) {
	        this.x -= e.offsetLeft
	        this.y -= e.offsetTop
	      }

	      // calculate cumulative zoom from svg documents
	      e = element
	      while (e.parent && (e = e.parent())) {
	        if (e.viewbox) {
	          zoom *= e.viewbox().zoom
	          this.x -= e.x() || 0
	          this.y -= e.y() || 0
	        }
	      }

	      // recalculate viewbox distortion
	      this.width  = box.width  /= zoom
	      this.height = box.height /= zoom
	    }

	    // add center, right and bottom
	    fullBox(this)

	    // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
	    this.x += window.pageXOffset
	    this.y += window.pageYOffset
	  }

	  // define Parent
	, parent: SVG.Element

	  // Constructor
	, construct: {
	    // Get rect box
	    rbox: function() {
	      return new SVG.RBox(this)
	    }
	  }

	})

	// Add universal merge method
	;[SVG.BBox, SVG.TBox, SVG.RBox].forEach(function(c) {

	  SVG.extend(c, {
	    // Merge rect box with another, return a new instance
	    merge: function(box) {
	      var b = new c()

	      // merge boxes
	      b.x      = Math.min(this.x, box.x)
	      b.y      = Math.min(this.y, box.y)
	      b.width  = Math.max(this.x + this.width,  box.x + box.width)  - b.x
	      b.height = Math.max(this.y + this.height, box.y + box.height) - b.y

	      return fullBox(b)
	    }

	  })

	})

	SVG.Matrix = SVG.invent({
	  // Initialize
	  create: function(source) {
	    var i, base = arrayToMatrix([1, 0, 0, 1, 0, 0])

	    // ensure source as object
	    source = source instanceof SVG.Element ?
	      source.matrixify() :
	    typeof source === 'string' ?
	      stringToMatrix(source) :
	    arguments.length == 6 ?
	      arrayToMatrix([].slice.call(arguments)) :
	    typeof source === 'object' ?
	      source : base

	    // merge source
	    for (i = abcdef.length - 1; i >= 0; --i)
	      this[abcdef[i]] = source && typeof source[abcdef[i]] === 'number' ?
	        source[abcdef[i]] : base[abcdef[i]]
	  }

	  // Add methods
	, extend: {
	    // Extract individual transformations
	    extract: function() {
	      // find delta transform points
	      var px    = deltaTransformPoint(this, 0, 1)
	        , py    = deltaTransformPoint(this, 1, 0)
	        , skewX = 180 / Math.PI * Math.atan2(px.y, px.x) - 90

	      return {
	        // translation
	        x:        this.e
	      , y:        this.f
	      , transformedX:(this.e * Math.cos(skewX * Math.PI / 180) + this.f * Math.sin(skewX * Math.PI / 180)) / Math.sqrt(this.a * this.a + this.b * this.b)
	      , transformedY:(this.f * Math.cos(skewX * Math.PI / 180) + this.e * Math.sin(-skewX * Math.PI / 180)) / Math.sqrt(this.c * this.c + this.d * this.d)
	        // skew
	      , skewX:    -skewX
	      , skewY:    180 / Math.PI * Math.atan2(py.y, py.x)
	        // scale
	      , scaleX:   Math.sqrt(this.a * this.a + this.b * this.b)
	      , scaleY:   Math.sqrt(this.c * this.c + this.d * this.d)
	        // rotation
	      , rotation: skewX
	      , a: this.a
	      , b: this.b
	      , c: this.c
	      , d: this.d
	      , e: this.e
	      , f: this.f
	      , matrix: new SVG.Matrix(this)
	      }
	    }
	    // Clone matrix
	  , clone: function() {
	      return new SVG.Matrix(this)
	    }
	    // Morph one matrix into another
	  , morph: function(matrix) {
	      // store new destination
	      this.destination = new SVG.Matrix(matrix)

	      return this
	    }
	    // Get morphed matrix at a given position
	  , at: function(pos) {
	      // make sure a destination is defined
	      if (!this.destination) return this

	      // calculate morphed matrix at a given position
	      var matrix = new SVG.Matrix({
	        a: this.a + (this.destination.a - this.a) * pos
	      , b: this.b + (this.destination.b - this.b) * pos
	      , c: this.c + (this.destination.c - this.c) * pos
	      , d: this.d + (this.destination.d - this.d) * pos
	      , e: this.e + (this.destination.e - this.e) * pos
	      , f: this.f + (this.destination.f - this.f) * pos
	      })

	      // process parametric rotation if present
	      if (this.param && this.param.to) {
	        // calculate current parametric position
	        var param = {
	          rotation: this.param.from.rotation + (this.param.to.rotation - this.param.from.rotation) * pos
	        , cx:       this.param.from.cx
	        , cy:       this.param.from.cy
	        }

	        // rotate matrix
	        matrix = matrix.rotate(
	          (this.param.to.rotation - this.param.from.rotation * 2) * pos
	        , param.cx
	        , param.cy
	        )

	        // store current parametric values
	        matrix.param = param
	      }

	      return matrix
	    }
	    // Multiplies by given matrix
	  , multiply: function(matrix) {
	      return new SVG.Matrix(this.native().multiply(parseMatrix(matrix).native()))
	    }
	    // Inverses matrix
	  , inverse: function() {
	      return new SVG.Matrix(this.native().inverse())
	    }
	    // Translate matrix
	  , translate: function(x, y) {
	      return new SVG.Matrix(this.native().translate(x || 0, y || 0))
	    }
	    // Scale matrix
	  , scale: function(x, y, cx, cy) {
	      // support uniformal scale
	      if (arguments.length == 1) {
	        y = x
	      } else if (arguments.length == 3) {
	        cy = cx
	        cx = y
	        y = x
	      }

	      return this.around(cx, cy, new SVG.Matrix(x, 0, 0, y, 0, 0))
	    }
	    // Rotate matrix
	  , rotate: function(r, cx, cy) {
	      // convert degrees to radians
	      r = SVG.utils.radians(r)

	      return this.around(cx, cy, new SVG.Matrix(Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0))
	    }
	    // Flip matrix on x or y, at a given offset
	  , flip: function(a, o) {
	      return a == 'x' ? this.scale(-1, 1, o, 0) : this.scale(1, -1, 0, o)
	    }
	    // Skew
	  , skew: function(x, y, cx, cy) {
	      // support uniformal skew
	      if (arguments.length == 1) {
	        y = x
	      } else if (arguments.length == 3) {
	        cy = cx
	        cx = y
	        y = x
	      }

	      // convert degrees to radians
	      x = SVG.utils.radians(x)
	      y = SVG.utils.radians(y)

	      return this.around(cx, cy, new SVG.Matrix(1, Math.tan(y), Math.tan(x), 1, 0, 0))
	    }
	    // SkewX
	  , skewX: function(x, cx, cy) {
	      return this.skew(x, 0, cx, cy)
	    }
	    // SkewY
	  , skewY: function(y, cx, cy) {
	      return this.skew(0, y, cx, cy)
	    }
	    // Transform around a center point
	  , around: function(cx, cy, matrix) {
	      return this
	        .multiply(new SVG.Matrix(1, 0, 0, 1, cx || 0, cy || 0))
	        .multiply(matrix)
	        .multiply(new SVG.Matrix(1, 0, 0, 1, -cx || 0, -cy || 0))
	    }
	    // Convert to native SVGMatrix
	  , native: function() {
	      // create new matrix
	      var matrix = SVG.parser.native.createSVGMatrix()

	      // update with current values
	      for (var i = abcdef.length - 1; i >= 0; i--)
	        matrix[abcdef[i]] = this[abcdef[i]]

	      return matrix
	    }
	    // Convert matrix to string
	  , toString: function() {
	      return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')'
	    }
	  }

	  // Define parent
	, parent: SVG.Element

	  // Add parent method
	, construct: {
	    // Get current matrix
	    ctm: function() {
	      return new SVG.Matrix(this.node.getCTM())
	    },
	    // Get current screen matrix
	    screenCTM: function() {
	      return new SVG.Matrix(this.node.getScreenCTM())
	    }

	  }

	})

	SVG.Point = SVG.invent({
	  // Initialize
	  create: function(x,y) {
	    var i, source, base = {x:0, y:0}

	    // ensure source as object
	    source = Array.isArray(x) ?
	      {x:x[0], y:x[1]} :
	    typeof x === 'object' ?
	      {x:x.x, y:x.y} :
	    x != null ?
	      {x:x, y:(y != null ? y : x)} : base // If y has no value, then x is used has its value

	    // merge source
	    this.x = source.x
	    this.y = source.y
	  }

	  // Add methods
	, extend: {
	    // Clone point
	    clone: function() {
	      return new SVG.Point(this)
	    }
	    // Morph one point into another
	  , morph: function(x, y) {
	      // store new destination
	      this.destination = new SVG.Point(x, y)

	      return this
	    }
	    // Get morphed point at a given position
	  , at: function(pos) {
	      // make sure a destination is defined
	      if (!this.destination) return this

	      // calculate morphed matrix at a given position
	      var point = new SVG.Point({
	        x: this.x + (this.destination.x - this.x) * pos
	      , y: this.y + (this.destination.y - this.y) * pos
	      })

	      return point
	    }
	    // Convert to native SVGPoint
	  , native: function() {
	      // create new point
	      var point = SVG.parser.native.createSVGPoint()

	      // update with current values
	      point.x = this.x
	      point.y = this.y

	      return point
	    }
	    // transform point with matrix
	  , transform: function(matrix) {
	      return new SVG.Point(this.native().matrixTransform(matrix.native()))
	    }

	  }

	})

	SVG.extend(SVG.Element, {

	  // Get point
	  point: function(x, y) {
	    return new SVG.Point(x,y).transform(this.screenCTM().inverse());
	  }

	})

	SVG.extend(SVG.Element, {
	  // Set svg element attribute
	  attr: function(a, v, n) {
	    // act as full getter
	    if (a == null) {
	      // get an object of attributes
	      a = {}
	      v = this.node.attributes
	      for (n = v.length - 1; n >= 0; n--)
	        a[v[n].nodeName] = SVG.regex.isNumber.test(v[n].nodeValue) ? parseFloat(v[n].nodeValue) : v[n].nodeValue

	      return a

	    } else if (typeof a == 'object') {
	      // apply every attribute individually if an object is passed
	      for (v in a) this.attr(v, a[v])

	    } else if (v === null) {
	        // remove value
	        this.node.removeAttribute(a)

	    } else if (v == null) {
	      // act as a getter if the first and only argument is not an object
	      v = this.node.getAttribute(a)
	      return v == null ?
	        SVG.defaults.attrs[a] :
	      SVG.regex.isNumber.test(v) ?
	        parseFloat(v) : v

	    } else {
	      // BUG FIX: some browsers will render a stroke if a color is given even though stroke width is 0
	      if (a == 'stroke-width')
	        this.attr('stroke', parseFloat(v) > 0 ? this._stroke : null)
	      else if (a == 'stroke')
	        this._stroke = v

	      // convert image fill and stroke to patterns
	      if (a == 'fill' || a == 'stroke') {
	        if (SVG.regex.isImage.test(v))
	          v = this.doc().defs().image(v, 0, 0)

	        if (v instanceof SVG.Image)
	          v = this.doc().defs().pattern(0, 0, function() {
	            this.add(v)
	          })
	      }

	      // ensure correct numeric values (also accepts NaN and Infinity)
	      if (typeof v === 'number')
	        v = new SVG.Number(v)

	      // ensure full hex color
	      else if (SVG.Color.isColor(v))
	        v = new SVG.Color(v)

	      // parse array values
	      else if (Array.isArray(v))
	        v = new SVG.Array(v)

	      // store parametric transformation values locally
	      else if (v instanceof SVG.Matrix && v.param)
	        this.param = v.param

	      // if the passed attribute is leading...
	      if (a == 'leading') {
	        // ... call the leading method instead
	        if (this.leading)
	          this.leading(v)
	      } else {
	        // set given attribute on node
	        typeof n === 'string' ?
	          this.node.setAttributeNS(n, a, v.toString()) :
	          this.node.setAttribute(a, v.toString())
	      }

	      // rebuild if required
	      if (this.rebuild && (a == 'font-size' || a == 'x'))
	        this.rebuild(a, v)
	    }

	    return this
	  }
	})
	SVG.extend(SVG.Element, {
	  // Add transformations
	  transform: function(o, relative) {
	    // get target in case of the fx module, otherwise reference this
	    var target = this
	      , matrix

	    // act as a getter
	    if (typeof o !== 'object') {
	      // get current matrix
	      matrix = new SVG.Matrix(target).extract()

	      return typeof o === 'string' ? matrix[o] : matrix
	    }

	    // get current matrix
	    matrix = new SVG.Matrix(target)

	    // ensure relative flag
	    relative = !!relative || !!o.relative

	    // act on matrix
	    if (o.a != null) {
	      matrix = relative ?
	        // relative
	        matrix.multiply(new SVG.Matrix(o)) :
	        // absolute
	        new SVG.Matrix(o)

	    // act on rotation
	    } else if (o.rotation != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // apply transformation
	      matrix = relative ?
	        // relative
	        matrix.rotate(o.rotation, o.cx, o.cy) :
	        // absolute
	        matrix.rotate(o.rotation - matrix.extract().rotation, o.cx, o.cy)

	    // act on scale
	    } else if (o.scale != null || o.scaleX != null || o.scaleY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure scale values on both axes
	      o.scaleX = o.scale != null ? o.scale : o.scaleX != null ? o.scaleX : 1
	      o.scaleY = o.scale != null ? o.scale : o.scaleY != null ? o.scaleY : 1

	      if (!relative) {
	        // absolute; multiply inversed values
	        var e = matrix.extract()
	        o.scaleX = o.scaleX * 1 / e.scaleX
	        o.scaleY = o.scaleY * 1 / e.scaleY
	      }

	      matrix = matrix.scale(o.scaleX, o.scaleY, o.cx, o.cy)

	    // act on skew
	    } else if (o.skew != null || o.skewX != null || o.skewY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure skew values on both axes
	      o.skewX = o.skew != null ? o.skew : o.skewX != null ? o.skewX : 0
	      o.skewY = o.skew != null ? o.skew : o.skewY != null ? o.skewY : 0

	      if (!relative) {
	        // absolute; reset skew values
	        var e = matrix.extract()
	        matrix = matrix.multiply(new SVG.Matrix().skew(e.skewX, e.skewY, o.cx, o.cy).inverse())
	      }

	      matrix = matrix.skew(o.skewX, o.skewY, o.cx, o.cy)

	    // act on flip
	    } else if (o.flip) {
	      matrix = matrix.flip(
	        o.flip
	      , o.offset == null ? target.bbox()['c' + o.flip] : o.offset
	      )

	    // act on translate
	    } else if (o.x != null || o.y != null) {
	      if (relative) {
	        // relative
	        matrix = matrix.translate(o.x, o.y)
	      } else {
	        // absolute
	        if (o.x != null) matrix.e = o.x
	        if (o.y != null) matrix.f = o.y
	      }
	    }

	    return this.attr('transform', matrix)
	  }
	})

	SVG.extend(SVG.FX, {
	  transform: function(o, relative) {
	    // get target in case of the fx module, otherwise reference this
	    var target = this.target()
	      , matrix

	    // act as a getter
	    if (typeof o !== 'object') {
	      // get current matrix
	      matrix = new SVG.Matrix(target).extract()

	      return typeof o === 'string' ? matrix[o] : matrix
	    }

	    // ensure relative flag
	    relative = !!relative || !!o.relative

	    // act on matrix
	    if (o.a != null) {
	      matrix = new SVG.Matrix(o)

	    // act on rotation
	    } else if (o.rotation != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // apply transformation
	      matrix = new SVG.Rotate(o.rotation, o.cx, o.cy)

	    // act on scale
	    } else if (o.scale != null || o.scaleX != null || o.scaleY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure scale values on both axes
	      o.scaleX = o.scale != null ? o.scale : o.scaleX != null ? o.scaleX : 1
	      o.scaleY = o.scale != null ? o.scale : o.scaleY != null ? o.scaleY : 1

	      matrix = new SVG.Scale(o.scaleX, o.scaleY, o.cx, o.cy)

	    // act on skew
	    } else if (o.skewX != null || o.skewY != null) {
	      // ensure centre point
	      ensureCentre(o, target)

	      // ensure skew values on both axes
	      o.skewX = o.skewX != null ? o.skewX : 0
	      o.skewY = o.skewY != null ? o.skewY : 0

	      matrix = new SVG.Skew(o.skewX, o.skewY, o.cx, o.cy)

	    // act on flip
	    } else if (o.flip) {
	      matrix = new SVG.Matrix().morph(new SVG.Matrix().flip(
	        o.flip
	      , o.offset == null ? target.bbox()['c' + o.flip] : o.offset
	      ))

	    // act on translate
	    } else if (o.x != null || o.y != null) {
	      matrix = new SVG.Translate(o.x, o.y)
	    }

	    if(!matrix) return this

	    matrix.relative = relative

	    this.last().transforms.push(matrix)

	    setTimeout(function(){this.start()}.bind(this), 0)

	    return this
	  }
	})

	SVG.extend(SVG.Element, {
	  // Reset all transformations
	  untransform: function() {
	    return this.attr('transform', null)
	  },
	  // merge the whole transformation chain into one matrix and returns it
	  matrixify: function() {

	    var matrix = (this.attr('transform') || '')
	      // split transformations
	      .split(/\)\s*,?\s*/).slice(0,-1).map(function(str){
	        // generate key => value pairs
	        var kv = str.trim().split('(')
	        return [kv[0], kv[1].split(SVG.regex.matrixElements).map(function(str){ return parseFloat(str) })]
	      })
	      // calculate every transformation into one matrix
	      .reduce(function(matrix, transform){

	        if(transform[0] == 'matrix') return matrix.multiply(arrayToMatrix(transform[1]))
	        return matrix[transform[0]].apply(matrix, transform[1])

	      }, new SVG.Matrix())

	    return matrix
	  },
	  // add an element to another parent without changing the visual representation on the screen
	  toParent: function(parent) {
	    if(this == parent) return this
	    var ctm = this.screenCTM()
	    var temp = parent.rect(1,1)
	    var pCtm = temp.screenCTM().inverse()
	    temp.remove()

	    this.addTo(parent).untransform().transform(pCtm.multiply(ctm))

	    return this
	  },
	  // same as above with parent equals root-svg
	  toDoc: function() {
	    return this.toParent(this.doc())
	  }

	})

	SVG.Transformation = SVG.invent({

	  create: function(source, inversed){

	    if(arguments.length > 1 && typeof inversed != 'boolean'){
	      return this.create([].slice.call(arguments))
	    }

	    if(typeof source == 'object'){
	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        this[this.arguments[i]] = source[this.arguments[i]]
	      }
	    }

	    if(Array.isArray(source)){
	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        this[this.arguments[i]] = source[i]
	      }
	    }

	    this.inversed = false

	    if(inversed === true){
	      this.inversed = true
	    }

	  }

	, extend: {

	    at: function(pos){

	      var params = []

	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        params.push(this[this.arguments[i]])
	      }

	      var m = this._undo || new SVG.Matrix()

	      m = new SVG.Matrix().morph(SVG.Matrix.prototype[this.method].apply(m, params)).at(pos)

	      return this.inversed ? m.inverse() : m

	    }

	  , undo: function(o){
	      for(var i = 0, len = this.arguments.length; i < len; ++i){
	        o[this.arguments[i]] = typeof this[this.arguments[i]] == 'undefined' ? 0 : o[this.arguments[i]]
	      }

	      // The method SVG.Matrix.extract which was used before calling this
	      // method to obtain a value for the parameter o doesn't return a cx and
	      // a cy so we use the ones that were provided to this object at its creation
	      o.cx = this.cx
	      o.cy = this.cy

	      this._undo = new SVG[capitalize(this.method)](o, true).at(1)

	      return this
	    }

	  }

	})

	SVG.Translate = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    if(typeof source == 'object') this.constructor.call(this, source, inversed)
	    else this.constructor.call(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['transformedX', 'transformedY']
	  , method: 'translate'
	  }

	})

	SVG.Rotate = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    if(typeof source == 'object') this.constructor.call(this, source, inversed)
	    else this.constructor.call(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['rotation', 'cx', 'cy']
	  , method: 'rotate'
	  , at: function(pos){
	      var m = new SVG.Matrix().rotate(new SVG.Number().morph(this.rotation - (this._undo ? this._undo.rotation : 0)).at(pos), this.cx, this.cy)
	      return this.inversed ? m.inverse() : m
	    }
	  , undo: function(o){
	      this._undo = o
	    }
	  }

	})

	SVG.Scale = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    if(typeof source == 'object') this.constructor.call(this, source, inversed)
	    else this.constructor.call(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['scaleX', 'scaleY', 'cx', 'cy']
	  , method: 'scale'
	  }

	})

	SVG.Skew = SVG.invent({

	  parent: SVG.Matrix
	, inherit: SVG.Transformation

	, create: function(source, inversed){
	    if(typeof source == 'object') this.constructor.call(this, source, inversed)
	    else this.constructor.call(this, [].slice.call(arguments))
	  }

	, extend: {
	    arguments: ['skewX', 'skewY', 'cx', 'cy']
	  , method: 'skew'
	  }

	})

	SVG.extend(SVG.Element, {
	  // Dynamic style generator
	  style: function(s, v) {
	    if (arguments.length == 0) {
	      // get full style
	      return this.node.style.cssText || ''

	    } else if (arguments.length < 2) {
	      // apply every style individually if an object is passed
	      if (typeof s == 'object') {
	        for (v in s) this.style(v, s[v])

	      } else if (SVG.regex.isCss.test(s)) {
	        // parse css string
	        s = s.split(';')

	        // apply every definition individually
	        for (var i = 0; i < s.length; i++) {
	          v = s[i].split(':')
	          this.style(v[0].replace(/\s+/g, ''), v[1])
	        }
	      } else {
	        // act as a getter if the first and only argument is not an object
	        return this.node.style[camelCase(s)]
	      }

	    } else {
	      this.node.style[camelCase(s)] = v === null || SVG.regex.isBlank.test(v) ? '' : v
	    }

	    return this
	  }
	})
	SVG.Parent = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    this.constructor.call(this, element)
	  }

	  // Inherit from
	, inherit: SVG.Element

	  // Add class methods
	, extend: {
	    // Returns all child elements
	    children: function() {
	      return SVG.utils.map(SVG.utils.filterSVGElements(this.node.childNodes), function(node) {
	        return SVG.adopt(node)
	      })
	    }
	    // Add given element at a position
	  , add: function(element, i) {
	      if (i == null)
	        this.node.appendChild(element.node)
	      else if (element.node != this.node.childNodes[i])
	        this.node.insertBefore(element.node, this.node.childNodes[i])

	      return this
	    }
	    // Basically does the same as `add()` but returns the added element instead
	  , put: function(element, i) {
	      this.add(element, i)
	      return element
	    }
	    // Checks if the given element is a child
	  , has: function(element) {
	      return this.index(element) >= 0
	    }
	    // Gets index of given element
	  , index: function(element) {
	      return [].slice.call(this.node.childNodes).indexOf(element.node)
	    }
	    // Get a element at the given index
	  , get: function(i) {
	      return SVG.adopt(this.node.childNodes[i])
	    }
	    // Get first child
	  , first: function() {
	      return this.get(0)
	    }
	    // Get the last child
	  , last: function() {
	      return this.get(this.node.childNodes.length - 1)
	    }
	    // Iterates over all children and invokes a given block
	  , each: function(block, deep) {
	      var i, il
	        , children = this.children()

	      for (i = 0, il = children.length; i < il; i++) {
	        if (children[i] instanceof SVG.Element)
	          block.apply(children[i], [i, children])

	        if (deep && (children[i] instanceof SVG.Container))
	          children[i].each(block, deep)
	      }

	      return this
	    }
	    // Remove a given child
	  , removeElement: function(element) {
	      this.node.removeChild(element.node)

	      return this
	    }
	    // Remove all elements in this container
	  , clear: function() {
	      // remove children
	      while(this.node.hasChildNodes())
	        this.node.removeChild(this.node.lastChild)

	      // remove defs reference
	      delete this._defs

	      return this
	    }
	  , // Get defs
	    defs: function() {
	      return this.doc().defs()
	    }
	  }

	})

	SVG.extend(SVG.Parent, {

	  ungroup: function(parent, depth) {
	    if(depth === 0 || this instanceof SVG.Defs) return this

	    parent = parent || (this instanceof SVG.Doc ? this : this.parent(SVG.Parent))
	    depth = depth || Infinity

	    this.each(function(){
	      if(this instanceof SVG.Defs) return this
	      if(this instanceof SVG.Parent) return this.ungroup(parent, depth-1)
	      return this.toParent(parent)
	    })

	    this.node.firstChild || this.remove()

	    return this
	  },

	  flatten: function(parent, depth) {
	    return this.ungroup(parent, depth)
	  }

	})
	SVG.Container = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    this.constructor.call(this, element)
	  }

	  // Inherit from
	, inherit: SVG.Parent

	})

	SVG.ViewBox = SVG.invent({

	  create: function(source) {
	    var i, base = [0, 0, 0, 0]

	    var x, y, width, height, box, view, we, he
	      , wm   = 1 // width multiplier
	      , hm   = 1 // height multiplier
	      , reg  = /[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?/gi

	    if(source instanceof SVG.Element){

	      we = source
	      he = source
	      view = (source.attr('viewBox') || '').match(reg)
	      box = source.bbox

	      // get dimensions of current node
	      width  = new SVG.Number(source.width())
	      height = new SVG.Number(source.height())

	      // find nearest non-percentual dimensions
	      while (width.unit == '%') {
	        wm *= width.value
	        width = new SVG.Number(we instanceof SVG.Doc ? we.parent().offsetWidth : we.parent().width())
	        we = we.parent()
	      }
	      while (height.unit == '%') {
	        hm *= height.value
	        height = new SVG.Number(he instanceof SVG.Doc ? he.parent().offsetHeight : he.parent().height())
	        he = he.parent()
	      }

	      // ensure defaults
	      this.x      = 0
	      this.y      = 0
	      this.width  = width  * wm
	      this.height = height * hm
	      this.zoom   = 1

	      if (view) {
	        // get width and height from viewbox
	        x      = parseFloat(view[0])
	        y      = parseFloat(view[1])
	        width  = parseFloat(view[2])
	        height = parseFloat(view[3])

	        // calculate zoom accoring to viewbox
	        this.zoom = ((this.width / this.height) > (width / height)) ?
	          this.height / height :
	          this.width  / width

	        // calculate real pixel dimensions on parent SVG.Doc element
	        this.x      = x
	        this.y      = y
	        this.width  = width
	        this.height = height

	      }

	    }else{

	      // ensure source as object
	      source = typeof source === 'string' ?
	        source.match(reg).map(function(el){ return parseFloat(el) }) :
	      Array.isArray(source) ?
	        source :
	      typeof source == 'object' ?
	        [source.x, source.y, source.width, source.height] :
	      arguments.length == 4 ?
	        [].slice.call(arguments) :
	        base

	      this.x = source[0]
	      this.y = source[1]
	      this.width = source[2]
	      this.height = source[3]
	    }


	  }

	, extend: {

	    toString: function() {
	      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height
	    }
	  , morph: function(v){

	      var v = arguments.length == 1 ?
	        [v.x, v.y, v.width, v.height] :
	        [].slice.call(arguments)

	      this.destination = new SVG.ViewBox(v)

	      return this

	    }

	  , at: function(pos) {

	    if(!this.destination) return this

	    return new SVG.ViewBox([
	        this.x + (this.destination.x - this.x) * pos
	      , this.y + (this.destination.y - this.y) * pos
	      , this.width + (this.destination.width - this.width) * pos
	      , this.height + (this.destination.height - this.height) * pos
	    ])

	    }

	  }

	  // Define parent
	, parent: SVG.Container

	  // Add parent method
	, construct: {

	    // get/set viewbox
	    viewbox: function(v) {
	      if (arguments.length == 0)
	        // act as a getter if there are no arguments
	        return new SVG.ViewBox(this)

	      // otherwise act as a setter
	      v = arguments.length == 1 ?
	        [v.x, v.y, v.width, v.height] :
	        [].slice.call(arguments)

	      return this.attr('viewBox', v)
	    }

	  }

	})
	// Add events to elements
	;[  'click'
	  , 'dblclick'
	  , 'mousedown'
	  , 'mouseup'
	  , 'mouseover'
	  , 'mouseout'
	  , 'mousemove'
	  // , 'mouseenter' -> not supported by IE
	  // , 'mouseleave' -> not supported by IE
	  , 'touchstart'
	  , 'touchmove'
	  , 'touchleave'
	  , 'touchend'
	  , 'touchcancel' ].forEach(function(event) {

	  // add event to SVG.Element
	  SVG.Element.prototype[event] = function(f) {
	    var self = this

	    // bind event to element rather than element node
	    this.node['on' + event] = typeof f == 'function' ?
	      function() { return f.apply(self, arguments) } : null

	    return this
	  }

	})

	// Initialize listeners stack
	SVG.listeners = []
	SVG.handlerMap = []
	SVG.listenerId = 0

	// Add event binder in the SVG namespace
	SVG.on = function(node, event, listener, binding) {
	  // create listener, get object-index
	  var l     = listener.bind(binding || node.instance || node)
	    , index = (SVG.handlerMap.indexOf(node) + 1 || SVG.handlerMap.push(node)) - 1
	    , ev    = event.split('.')[0]
	    , ns    = event.split('.')[1] || '*'


	  // ensure valid object
	  SVG.listeners[index]         = SVG.listeners[index]         || {}
	  SVG.listeners[index][ev]     = SVG.listeners[index][ev]     || {}
	  SVG.listeners[index][ev][ns] = SVG.listeners[index][ev][ns] || {}

	  if(!listener._svgjsListenerId)
	    listener._svgjsListenerId = ++SVG.listenerId

	  // reference listener
	  SVG.listeners[index][ev][ns][listener._svgjsListenerId] = l

	  // add listener
	  node.addEventListener(ev, l, false)
	}

	// Add event unbinder in the SVG namespace
	SVG.off = function(node, event, listener) {
	  var index = SVG.handlerMap.indexOf(node)
	    , ev    = event && event.split('.')[0]
	    , ns    = event && event.split('.')[1]

	  if(index == -1) return

	  if (listener) {
	    if(typeof listener == 'function') listener = listener._svgjsListenerId
	    if(!listener) return

	    // remove listener reference
	    if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns || '*']) {
	      // remove listener
	      node.removeEventListener(ev, SVG.listeners[index][ev][ns || '*'][listener], false)

	      delete SVG.listeners[index][ev][ns || '*'][listener]
	    }

	  } else if (ns && ev) {
	    // remove all listeners for a namespaced event
	    if (SVG.listeners[index][ev] && SVG.listeners[index][ev][ns]) {
	      for (listener in SVG.listeners[index][ev][ns])
	        SVG.off(node, [ev, ns].join('.'), listener)

	      delete SVG.listeners[index][ev][ns]
	    }

	  } else if (ns){
	    // remove all listeners for a specific namespace
	    for(event in SVG.listeners[index]){
	        for(namespace in SVG.listeners[index][event]){
	            if(ns === namespace){
	                SVG.off(node, [event, ns].join('.'))
	            }
	        }
	    }

	  } else if (ev) {
	    // remove all listeners for the event
	    if (SVG.listeners[index][ev]) {
	      for (namespace in SVG.listeners[index][ev])
	        SVG.off(node, [ev, namespace].join('.'))

	      delete SVG.listeners[index][ev]
	    }

	  } else {
	    // remove all listeners on a given node
	    for (event in SVG.listeners[index])
	      SVG.off(node, event)

	    delete SVG.listeners[index]

	  }
	}

	//
	SVG.extend(SVG.Element, {
	  // Bind given event to listener
	  on: function(event, listener, binding) {
	    SVG.on(this.node, event, listener, binding)

	    return this
	  }
	  // Unbind event from listener
	, off: function(event, listener) {
	    SVG.off(this.node, event, listener)

	    return this
	  }
	  // Fire given event
	, fire: function(event, data) {

	    // Dispatch event
	    if(event instanceof Event){
	        this.node.dispatchEvent(event)
	    }else{
	        this.node.dispatchEvent(new CustomEvent(event, {detail:data}))
	    }

	    return this
	  }
	})

	SVG.Defs = SVG.invent({
	  // Initialize node
	  create: 'defs'

	  // Inherit from
	, inherit: SVG.Container

	})
	SVG.G = SVG.invent({
	  // Initialize node
	  create: 'g'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Move over x-axis
	    x: function(x) {
	      return x == null ? this.transform('x') : this.transform({ x: x - this.x() }, true)
	    }
	    // Move over y-axis
	  , y: function(y) {
	      return y == null ? this.transform('y') : this.transform({ y: y - this.y() }, true)
	    }
	    // Move by center over x-axis
	  , cx: function(x) {
	      return x == null ? this.gbox().cx : this.x(x - this.gbox().width / 2)
	    }
	    // Move by center over y-axis
	  , cy: function(y) {
	      return y == null ? this.gbox().cy : this.y(y - this.gbox().height / 2)
	    }
	  , gbox: function() {

	      var bbox  = this.bbox()
	        , trans = this.transform()

	      bbox.x  += trans.x
	      bbox.x2 += trans.x
	      bbox.cx += trans.x

	      bbox.y  += trans.y
	      bbox.y2 += trans.y
	      bbox.cy += trans.y

	      return bbox
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a group element
	    group: function() {
	      return this.put(new SVG.G)
	    }
	  }
	})

	// ### This module adds backward / forward functionality to elements.

	//
	SVG.extend(SVG.Element, {
	  // Get all siblings, including myself
	  siblings: function() {
	    return this.parent().children()
	  }
	  // Get the curent position siblings
	, position: function() {
	    return this.parent().index(this)
	  }
	  // Get the next element (will return null if there is none)
	, next: function() {
	    return this.siblings()[this.position() + 1]
	  }
	  // Get the next element (will return null if there is none)
	, previous: function() {
	    return this.siblings()[this.position() - 1]
	  }
	  // Send given element one step forward
	, forward: function() {
	    var i = this.position() + 1
	      , p = this.parent()

	    // move node one step forward
	    p.removeElement(this).add(this, i)

	    // make sure defs node is always at the top
	    if (p instanceof SVG.Doc)
	      p.node.appendChild(p.defs().node)

	    return this
	  }
	  // Send given element one step backward
	, backward: function() {
	    var i = this.position()

	    if (i > 0)
	      this.parent().removeElement(this).add(this, i - 1)

	    return this
	  }
	  // Send given element all the way to the front
	, front: function() {
	    var p = this.parent()

	    // Move node forward
	    p.node.appendChild(this.node)

	    // Make sure defs node is always at the top
	    if (p instanceof SVG.Doc)
	      p.node.appendChild(p.defs().node)

	    return this
	  }
	  // Send given element all the way to the back
	, back: function() {
	    if (this.position() > 0)
	      this.parent().removeElement(this).add(this, 0)

	    return this
	  }
	  // Inserts a given element before the targeted element
	, before: function(element) {
	    element.remove()

	    var i = this.position()

	    this.parent().add(element, i)

	    return this
	  }
	  // Insters a given element after the targeted element
	, after: function(element) {
	    element.remove()

	    var i = this.position()

	    this.parent().add(element, i + 1)

	    return this
	  }

	})
	SVG.Mask = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('mask'))

	    // keep references to masked elements
	    this.targets = []
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Unmask all masked elements and remove itself
	    remove: function() {
	      // unmask all targets
	      for (var i = this.targets.length - 1; i >= 0; i--)
	        if (this.targets[i])
	          this.targets[i].unmask()
	      this.targets = []

	      // remove mask from parent
	      this.parent().removeElement(this)

	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create masking element
	    mask: function() {
	      return this.defs().put(new SVG.Mask)
	    }
	  }
	})


	SVG.extend(SVG.Element, {
	  // Distribute mask to svg element
	  maskWith: function(element) {
	    // use given mask or create a new one
	    this.masker = element instanceof SVG.Mask ? element : this.parent().mask().add(element)

	    // store reverence on self in mask
	    this.masker.targets.push(this)

	    // apply mask
	    return this.attr('mask', 'url("#' + this.masker.attr('id') + '")')
	  }
	  // Unmask element
	, unmask: function() {
	    delete this.masker
	    return this.attr('mask', null)
	  }

	})

	SVG.ClipPath = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('clipPath'))

	    // keep references to clipped elements
	    this.targets = []
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Unclip all clipped elements and remove itself
	    remove: function() {
	      // unclip all targets
	      for (var i = this.targets.length - 1; i >= 0; i--)
	        if (this.targets[i])
	          this.targets[i].unclip()
	      this.targets = []

	      // remove clipPath from parent
	      this.parent().removeElement(this)

	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create clipping element
	    clip: function() {
	      return this.defs().put(new SVG.ClipPath)
	    }
	  }
	})

	//
	SVG.extend(SVG.Element, {
	  // Distribute clipPath to svg element
	  clipWith: function(element) {
	    // use given clip or create a new one
	    this.clipper = element instanceof SVG.ClipPath ? element : this.parent().clip().add(element)

	    // store reverence on self in mask
	    this.clipper.targets.push(this)

	    // apply mask
	    return this.attr('clip-path', 'url("#' + this.clipper.attr('id') + '")')
	  }
	  // Unclip element
	, unclip: function() {
	    delete this.clipper
	    return this.attr('clip-path', null)
	  }

	})
	SVG.Gradient = SVG.invent({
	  // Initialize node
	  create: function(type) {
	    this.constructor.call(this, SVG.create(type + 'Gradient'))

	    // store type
	    this.type = type
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Add a color stop
	    at: function(offset, color, opacity) {
	      return this.put(new SVG.Stop).update(offset, color, opacity)
	    }
	    // Update gradient
	  , update: function(block) {
	      // remove all stops
	      this.clear()

	      // invoke passed block
	      if (typeof block == 'function')
	        block.call(this, this)

	      return this
	    }
	    // Return the fill id
	  , fill: function() {
	      return 'url(#' + this.id() + ')'
	    }
	    // Alias string convertion to fill
	  , toString: function() {
	      return this.fill()
	    }
	    // custom attr to handle transform
	  , attr: function(a, b, c) {
	      if(a == 'transform') a = 'gradientTransform'
	      return SVG.Container.prototype.attr.call(this, a, b, c)
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create gradient element in defs
	    gradient: function(type, block) {
	      return this.defs().gradient(type, block)
	    }
	  }
	})

	// Add animatable methods to both gradient and fx module
	SVG.extend(SVG.Gradient, SVG.FX, {
	  // From position
	  from: function(x, y) {
	    return (this._target || this).type == 'radial' ?
	      this.attr({ fx: new SVG.Number(x), fy: new SVG.Number(y) }) :
	      this.attr({ x1: new SVG.Number(x), y1: new SVG.Number(y) })
	  }
	  // To position
	, to: function(x, y) {
	    return (this._target || this).type == 'radial' ?
	      this.attr({ cx: new SVG.Number(x), cy: new SVG.Number(y) }) :
	      this.attr({ x2: new SVG.Number(x), y2: new SVG.Number(y) })
	  }
	})

	// Base gradient generation
	SVG.extend(SVG.Defs, {
	  // define gradient
	  gradient: function(type, block) {
	    return this.put(new SVG.Gradient(type)).update(block)
	  }

	})

	SVG.Stop = SVG.invent({
	  // Initialize node
	  create: 'stop'

	  // Inherit from
	, inherit: SVG.Element

	  // Add class methods
	, extend: {
	    // add color stops
	    update: function(o) {
	      if (typeof o == 'number' || o instanceof SVG.Number) {
	        o = {
	          offset:  arguments[0]
	        , color:   arguments[1]
	        , opacity: arguments[2]
	        }
	      }

	      // set attributes
	      if (o.opacity != null) this.attr('stop-opacity', o.opacity)
	      if (o.color   != null) this.attr('stop-color', o.color)
	      if (o.offset  != null) this.attr('offset', new SVG.Number(o.offset))

	      return this
	    }
	  }

	})

	SVG.Pattern = SVG.invent({
	  // Initialize node
	  create: 'pattern'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Return the fill id
	    fill: function() {
	      return 'url(#' + this.id() + ')'
	    }
	    // Update pattern by rebuilding
	  , update: function(block) {
	      // remove content
	      this.clear()

	      // invoke passed block
	      if (typeof block == 'function')
	        block.call(this, this)

	      return this
	    }
	    // Alias string convertion to fill
	  , toString: function() {
	      return this.fill()
	    }
	    // custom attr to handle transform
	  , attr: function(a, b, c) {
	      if(a == 'transform') a = 'patternTransform'
	      return SVG.Container.prototype.attr.call(this, a, b, c)
	    }

	  }

	  // Add parent method
	, construct: {
	    // Create pattern element in defs
	    pattern: function(width, height, block) {
	      return this.defs().pattern(width, height, block)
	    }
	  }
	})

	SVG.extend(SVG.Defs, {
	  // Define gradient
	  pattern: function(width, height, block) {
	    return this.put(new SVG.Pattern).update(block).attr({
	      x:            0
	    , y:            0
	    , width:        width
	    , height:       height
	    , patternUnits: 'userSpaceOnUse'
	    })
	  }

	})
	SVG.Doc = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    if (element) {
	      // ensure the presence of a dom element
	      element = typeof element == 'string' ?
	        document.getElementById(element) :
	        element

	      // If the target is an svg element, use that element as the main wrapper.
	      // This allows svg.js to work with svg documents as well.
	      if (element.nodeName == 'svg') {
	        this.constructor.call(this, element)
	      } else {
	        this.constructor.call(this, SVG.create('svg'))
	        element.appendChild(this.node)
	        this.size('100%', '100%')
	      }

	      // set svg element attributes and ensure defs node
	      this.namespace().defs()
	    }
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Add namespaces
	    namespace: function() {
	      return this
	        .attr({ xmlns: SVG.ns, version: '1.1' })
	        .attr('xmlns:xlink', SVG.xlink, SVG.xmlns)
	        .attr('xmlns:svgjs', SVG.svgjs, SVG.xmlns)
	    }
	    // Creates and returns defs element
	  , defs: function() {
	      if (!this._defs) {
	        var defs

	        // Find or create a defs element in this instance
	        if (defs = this.node.getElementsByTagName('defs')[0])
	          this._defs = SVG.adopt(defs)
	        else
	          this._defs = new SVG.Defs

	        // Make sure the defs node is at the end of the stack
	        this.node.appendChild(this._defs.node)
	      }

	      return this._defs
	    }
	    // custom parent method
	  , parent: function() {
	      return this.node.parentNode.nodeName == '#document' ? null : this.node.parentNode
	    }
	    // Fix for possible sub-pixel offset. See:
	    // https://bugzilla.mozilla.org/show_bug.cgi?id=608812
	  , spof: function(spof) {
	      var pos = this.node.getScreenCTM()

	      if (pos)
	        this
	          .style('left', (-pos.e % 1) + 'px')
	          .style('top',  (-pos.f % 1) + 'px')

	      return this
	    }

	      // Removes the doc from the DOM
	  , remove: function() {
	      if(this.parent()) {
	        this.parent().removeChild(this.node);
	      }

	      return this;
	    }
	  }

	})

	SVG.Shape = SVG.invent({
	  // Initialize node
	  create: function(element) {
	    this.constructor.call(this, element)
	  }

	  // Inherit from
	, inherit: SVG.Element

	})

	SVG.Bare = SVG.invent({
	  // Initialize
	  create: function(element, inherit) {
	    // construct element
	    this.constructor.call(this, SVG.create(element))

	    // inherit custom methods
	    if (inherit)
	      for (var method in inherit.prototype)
	        if (typeof inherit.prototype[method] === 'function')
	          this[method] = inherit.prototype[method]
	  }

	  // Inherit from
	, inherit: SVG.Element

	  // Add methods
	, extend: {
	    // Insert some plain text
	    words: function(text) {
	      // remove contents
	      while (this.node.hasChildNodes())
	        this.node.removeChild(this.node.lastChild)

	      // create text node
	      this.node.appendChild(document.createTextNode(text))

	      return this
	    }
	  }
	})


	SVG.extend(SVG.Parent, {
	  // Create an element that is not described by SVG.js
	  element: function(element, inherit) {
	    return this.put(new SVG.Bare(element, inherit))
	  }
	  // Add symbol element
	, symbol: function() {
	    return this.defs().element('symbol', SVG.Container)
	  }

	})
	SVG.Use = SVG.invent({
	  // Initialize node
	  create: 'use'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Use element as a reference
	    element: function(element, file) {
	      // Set lined element
	      return this.attr('href', (file || '') + '#' + element, SVG.xlink)
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a use element
	    use: function(element, file) {
	      return this.put(new SVG.Use).element(element, file)
	    }
	  }
	})
	SVG.Rect = SVG.invent({
	  // Initialize node
	  create: 'rect'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create a rect element
	    rect: function(width, height) {
	      return this.put(new SVG.Rect()).size(width, height)
	    }
	  }
	})
	SVG.Circle = SVG.invent({
	  // Initialize node
	  create: 'circle'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create circle element, based on ellipse
	    circle: function(size) {
	      return this.put(new SVG.Circle).rx(new SVG.Number(size).divide(2)).move(0, 0)
	    }
	  }
	})

	SVG.extend(SVG.Circle, SVG.FX, {
	  // Radius x value
	  rx: function(rx) {
	    return this.attr('r', rx)
	  }
	  // Alias radius x value
	, ry: function(ry) {
	    return this.rx(ry)
	  }
	})

	SVG.Ellipse = SVG.invent({
	  // Initialize node
	  create: 'ellipse'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create an ellipse
	    ellipse: function(width, height) {
	      return this.put(new SVG.Ellipse).size(width, height).move(0, 0)
	    }
	  }
	})

	SVG.extend(SVG.Ellipse, SVG.Rect, SVG.FX, {
	  // Radius x value
	  rx: function(rx) {
	    return this.attr('rx', rx)
	  }
	  // Radius y value
	, ry: function(ry) {
	    return this.attr('ry', ry)
	  }
	})

	// Add common method
	SVG.extend(SVG.Circle, SVG.Ellipse, {
	    // Move over x-axis
	    x: function(x) {
	      return x == null ? this.cx() - this.rx() : this.cx(x + this.rx())
	    }
	    // Move over y-axis
	  , y: function(y) {
	      return y == null ? this.cy() - this.ry() : this.cy(y + this.ry())
	    }
	    // Move by center over x-axis
	  , cx: function(x) {
	      return x == null ? this.attr('cx') : this.attr('cx', x)
	    }
	    // Move by center over y-axis
	  , cy: function(y) {
	      return y == null ? this.attr('cy') : this.attr('cy', y)
	    }
	    // Set width of element
	  , width: function(width) {
	      return width == null ? this.rx() * 2 : this.rx(new SVG.Number(width).divide(2))
	    }
	    // Set height of element
	  , height: function(height) {
	      return height == null ? this.ry() * 2 : this.ry(new SVG.Number(height).divide(2))
	    }
	    // Custom size function
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this
	        .rx(new SVG.Number(p.width).divide(2))
	        .ry(new SVG.Number(p.height).divide(2))
	    }
	})
	SVG.Line = SVG.invent({
	  // Initialize node
	  create: 'line'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Get array
	    array: function() {
	      return new SVG.PointArray([
	        [ this.attr('x1'), this.attr('y1') ]
	      , [ this.attr('x2'), this.attr('y2') ]
	      ])
	    }
	    // Overwrite native plot() method
	  , plot: function(x1, y1, x2, y2) {
	      if (typeof y1 !== 'undefined')
	        x1 = { x1: x1, y1: y1, x2: x2, y2: y2 }
	      else
	        x1 = new SVG.PointArray(x1).toLine()

	      return this.attr(x1)
	    }
	    // Move by left top corner
	  , move: function(x, y) {
	      return this.attr(this.array().move(x, y).toLine())
	    }
	    // Set element size to given width and height
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this.attr(this.array().size(p.width, p.height).toLine())
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a line element
	    line: function(x1, y1, x2, y2) {
	      return this.put(new SVG.Line).plot(x1, y1, x2, y2)
	    }
	  }
	})

	SVG.Polyline = SVG.invent({
	  // Initialize node
	  create: 'polyline'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create a wrapped polyline element
	    polyline: function(p) {
	      return this.put(new SVG.Polyline).plot(p)
	    }
	  }
	})

	SVG.Polygon = SVG.invent({
	  // Initialize node
	  create: 'polygon'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add parent method
	, construct: {
	    // Create a wrapped polygon element
	    polygon: function(p) {
	      return this.put(new SVG.Polygon).plot(p)
	    }
	  }
	})

	// Add polygon-specific functions
	SVG.extend(SVG.Polyline, SVG.Polygon, {
	  // Get array
	  array: function() {
	    return this._array || (this._array = new SVG.PointArray(this.attr('points')))
	  }
	  // Plot new path
	, plot: function(p) {
	    return this.attr('points', (this._array = new SVG.PointArray(p)))
	  }
	  // Move by left top corner
	, move: function(x, y) {
	    return this.attr('points', this.array().move(x, y))
	  }
	  // Set element size to given width and height
	, size: function(width, height) {
	    var p = proportionalSize(this, width, height)

	    return this.attr('points', this.array().size(p.width, p.height))
	  }

	})
	// unify all point to point elements
	SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, {
	  // Define morphable array
	  morphArray:  SVG.PointArray
	  // Move by left top corner over x-axis
	, x: function(x) {
	    return x == null ? this.bbox().x : this.move(x, this.bbox().y)
	  }
	  // Move by left top corner over y-axis
	, y: function(y) {
	    return y == null ? this.bbox().y : this.move(this.bbox().x, y)
	  }
	  // Set width of element
	, width: function(width) {
	    var b = this.bbox()

	    return width == null ? b.width : this.size(width, b.height)
	  }
	  // Set height of element
	, height: function(height) {
	    var b = this.bbox()

	    return height == null ? b.height : this.size(b.width, height)
	  }
	})
	SVG.Path = SVG.invent({
	  // Initialize node
	  create: 'path'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Define morphable array
	    morphArray:  SVG.PathArray
	    // Get array
	  , array: function() {
	      return this._array || (this._array = new SVG.PathArray(this.attr('d')))
	    }
	    // Plot new poly points
	  , plot: function(p) {
	      return this.attr('d', (this._array = new SVG.PathArray(p)))
	    }
	    // Move by left top corner
	  , move: function(x, y) {
	      return this.attr('d', this.array().move(x, y))
	    }
	    // Move by left top corner over x-axis
	  , x: function(x) {
	      return x == null ? this.bbox().x : this.move(x, this.bbox().y)
	    }
	    // Move by left top corner over y-axis
	  , y: function(y) {
	      return y == null ? this.bbox().y : this.move(this.bbox().x, y)
	    }
	    // Set element size to given width and height
	  , size: function(width, height) {
	      var p = proportionalSize(this, width, height)

	      return this.attr('d', this.array().size(p.width, p.height))
	    }
	    // Set width of element
	  , width: function(width) {
	      return width == null ? this.bbox().width : this.size(width, this.bbox().height)
	    }
	    // Set height of element
	  , height: function(height) {
	      return height == null ? this.bbox().height : this.size(this.bbox().width, height)
	    }

	  }

	  // Add parent method
	, construct: {
	    // Create a wrapped path element
	    path: function(d) {
	      return this.put(new SVG.Path).plot(d)
	    }
	  }
	})
	SVG.Image = SVG.invent({
	  // Initialize node
	  create: 'image'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // (re)load image
	    load: function(url) {
	      if (!url) return this

	      var self = this
	        , img  = document.createElement('img')

	      // preload image
	      img.onload = function() {
	        var p = self.parent(SVG.Pattern)

	        if(p === null) return

	        // ensure image size
	        if (self.width() == 0 && self.height() == 0)
	          self.size(img.width, img.height)

	        // ensure pattern size if not set
	        if (p && p.width() == 0 && p.height() == 0)
	          p.size(self.width(), self.height())

	        // callback
	        if (typeof self._loaded === 'function')
	          self._loaded.call(self, {
	            width:  img.width
	          , height: img.height
	          , ratio:  img.width / img.height
	          , url:    url
	          })
	      }

	      img.onerror = function(e){
	        if (typeof self._error === 'function'){
	            self._error.call(self, e)
	        }
	      }

	      return this.attr('href', (img.src = this.src = url), SVG.xlink)
	    }
	    // Add loaded callback
	  , loaded: function(loaded) {
	      this._loaded = loaded
	      return this
	    }

	  , error: function(error) {
	      this._error = error
	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // create image element, load image and set its size
	    image: function(source, width, height) {
	      return this.put(new SVG.Image).load(source).size(width || 0, height || width || 0)
	    }
	  }

	})
	SVG.Text = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('text'))

	    this.dom.leading = new SVG.Number(1.3)    // store leading value for rebuilding
	    this._rebuild = true                      // enable automatic updating of dy values
	    this._build   = false                     // disable build mode for adding multiple lines

	    // set default font
	    this.attr('font-family', SVG.defaults.attrs['font-family'])
	  }

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Move over x-axis
	    x: function(x) {
	      // act as getter
	      if (x == null)
	        return this.attr('x')

	      // move lines as well if no textPath is present
	      if (!this.textPath)
	        this.lines().each(function() { if (this.dom.newLined) this.x(x) })

	      return this.attr('x', x)
	    }
	    // Move over y-axis
	  , y: function(y) {
	      var oy = this.attr('y')
	        , o  = typeof oy === 'number' ? oy - this.bbox().y : 0

	      // act as getter
	      if (y == null)
	        return typeof oy === 'number' ? oy - o : oy

	      return this.attr('y', typeof y === 'number' ? y + o : y)
	    }
	    // Move center over x-axis
	  , cx: function(x) {
	      return x == null ? this.bbox().cx : this.x(x - this.bbox().width / 2)
	    }
	    // Move center over y-axis
	  , cy: function(y) {
	      return y == null ? this.bbox().cy : this.y(y - this.bbox().height / 2)
	    }
	    // Set the text content
	  , text: function(text) {
	      // act as getter
	      if (typeof text === 'undefined'){
	        var text = ''
	        var children = this.node.childNodes
	        for(var i = 0, len = children.length; i < len; ++i){

	          // add newline if its not the first child and newLined is set to true
	          if(i != 0 && children[i].nodeType != 3 && SVG.adopt(children[i]).dom.newLined == true){
	            text += '\n'
	          }

	          // add content of this node
	          text += children[i].textContent
	        }

	        return text
	      }

	      // remove existing content
	      this.clear().build(true)

	      if (typeof text === 'function') {
	        // call block
	        text.call(this, this)

	      } else {
	        // store text and make sure text is not blank
	        text = text.split('\n')

	        // build new lines
	        for (var i = 0, il = text.length; i < il; i++)
	          this.tspan(text[i]).newLine()
	      }

	      // disable build mode and rebuild lines
	      return this.build(false).rebuild()
	    }
	    // Set font size
	  , size: function(size) {
	      return this.attr('font-size', size).rebuild()
	    }
	    // Set / get leading
	  , leading: function(value) {
	      // act as getter
	      if (value == null)
	        return this.dom.leading

	      // act as setter
	      this.dom.leading = new SVG.Number(value)

	      return this.rebuild()
	    }
	    // Get all the first level lines
	  , lines: function() {
	      var node = (this.textPath && this.textPath() || this).node

	      // filter tspans and map them to SVG.js instances
	      var lines = SVG.utils.map(SVG.utils.filterSVGElements(node.childNodes), function(el){
	        return SVG.adopt(el)
	      })

	      // return an instance of SVG.set
	      return new SVG.Set(lines)
	    }
	    // Rebuild appearance type
	  , rebuild: function(rebuild) {
	      // store new rebuild flag if given
	      if (typeof rebuild == 'boolean')
	        this._rebuild = rebuild

	      // define position of all lines
	      if (this._rebuild) {
	        var self = this
	          , blankLineOffset = 0
	          , dy = this.dom.leading * new SVG.Number(this.attr('font-size'))

	        this.lines().each(function() {
	          if (this.dom.newLined) {
	            if (!this.textPath)
	              this.attr('x', self.attr('x'))

	            if(this.text() == '\n') {
	              blankLineOffset += dy
	            }else{
	              this.attr('dy', dy + blankLineOffset)
	              blankLineOffset = 0
	            }
	          }
	        })

	        this.fire('rebuild')
	      }

	      return this
	    }
	    // Enable / disable build mode
	  , build: function(build) {
	      this._build = !!build
	      return this
	    }
	    // overwrite method from parent to set data properly
	  , setData: function(o){
	      this.dom = o
	      this.dom.leading = new SVG.Number(o.leading || 1.3)
	      return this
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create text element
	    text: function(text) {
	      return this.put(new SVG.Text).text(text)
	    }
	    // Create plain text element
	  , plain: function(text) {
	      return this.put(new SVG.Text).plain(text)
	    }
	  }

	})

	SVG.Tspan = SVG.invent({
	  // Initialize node
	  create: 'tspan'

	  // Inherit from
	, inherit: SVG.Shape

	  // Add class methods
	, extend: {
	    // Set text content
	    text: function(text) {
	      if(text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '')

	      typeof text === 'function' ? text.call(this, this) : this.plain(text)

	      return this
	    }
	    // Shortcut dx
	  , dx: function(dx) {
	      return this.attr('dx', dx)
	    }
	    // Shortcut dy
	  , dy: function(dy) {
	      return this.attr('dy', dy)
	    }
	    // Create new line
	  , newLine: function() {
	      // fetch text parent
	      var t = this.parent(SVG.Text)

	      // mark new line
	      this.dom.newLined = true

	      // apply new hy¡n
	      return this.dy(t.dom.leading * t.attr('font-size')).attr('x', t.x())
	    }
	  }

	})

	SVG.extend(SVG.Text, SVG.Tspan, {
	  // Create plain text node
	  plain: function(text) {
	    // clear if build mode is disabled
	    if (this._build === false)
	      this.clear()

	    // create text node
	    this.node.appendChild(document.createTextNode(text))

	    return this
	  }
	  // Create a tspan
	, tspan: function(text) {
	    var node  = (this.textPath && this.textPath() || this).node
	      , tspan = new SVG.Tspan

	    // clear if build mode is disabled
	    if (this._build === false)
	      this.clear()

	    // add new tspan
	    node.appendChild(tspan.node)

	    return tspan.text(text)
	  }
	  // Clear all lines
	, clear: function() {
	    var node = (this.textPath && this.textPath() || this).node

	    // remove existing child nodes
	    while (node.hasChildNodes())
	      node.removeChild(node.lastChild)

	    return this
	  }
	  // Get length of text element
	, length: function() {
	    return this.node.getComputedTextLength()
	  }
	})

	SVG.TextPath = SVG.invent({
	  // Initialize node
	  create: 'textPath'

	  // Inherit from
	, inherit: SVG.Parent

	  // Define parent class
	, parent: SVG.Text

	  // Add parent method
	, construct: {
	    // Create path for text to run on
	    path: function(d) {
	      // create textPath element
	      var path  = new SVG.TextPath
	        , track = this.doc().defs().path(d)

	      // move lines to textpath
	      while (this.node.hasChildNodes())
	        path.node.appendChild(this.node.firstChild)

	      // add textPath element as child node
	      this.node.appendChild(path.node)

	      // link textPath to path and add content
	      path.attr('href', '#' + track, SVG.xlink)

	      return this
	    }
	    // Plot path if any
	  , plot: function(d) {
	      var track = this.track()

	      if (track)
	        track.plot(d)

	      return this
	    }
	    // Get the path track element
	  , track: function() {
	      var path = this.textPath()

	      if (path)
	        return path.reference('href')
	    }
	    // Get the textPath child
	  , textPath: function() {
	      if (this.node.firstChild && this.node.firstChild.nodeName == 'textPath')
	        return SVG.adopt(this.node.firstChild)
	    }
	  }
	})
	SVG.Nested = SVG.invent({
	  // Initialize node
	  create: function() {
	    this.constructor.call(this, SVG.create('svg'))

	    this.style('overflow', 'visible')
	  }

	  // Inherit from
	, inherit: SVG.Container

	  // Add parent method
	, construct: {
	    // Create nested svg document
	    nested: function() {
	      return this.put(new SVG.Nested)
	    }
	  }
	})
	SVG.A = SVG.invent({
	  // Initialize node
	  create: 'a'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Link url
	    to: function(url) {
	      return this.attr('href', url, SVG.xlink)
	    }
	    // Link show attribute
	  , show: function(target) {
	      return this.attr('show', target, SVG.xlink)
	    }
	    // Link target attribute
	  , target: function(target) {
	      return this.attr('target', target)
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a hyperlink element
	    link: function(url) {
	      return this.put(new SVG.A).to(url)
	    }
	  }
	})

	SVG.extend(SVG.Element, {
	  // Create a hyperlink element
	  linkTo: function(url) {
	    var link = new SVG.A

	    if (typeof url == 'function')
	      url.call(link, link)
	    else
	      link.to(url)

	    return this.parent().put(link).put(this)
	  }

	})
	SVG.Marker = SVG.invent({
	  // Initialize node
	  create: 'marker'

	  // Inherit from
	, inherit: SVG.Container

	  // Add class methods
	, extend: {
	    // Set width of element
	    width: function(width) {
	      return this.attr('markerWidth', width)
	    }
	    // Set height of element
	  , height: function(height) {
	      return this.attr('markerHeight', height)
	    }
	    // Set marker refX and refY
	  , ref: function(x, y) {
	      return this.attr('refX', x).attr('refY', y)
	    }
	    // Update marker
	  , update: function(block) {
	      // remove all content
	      this.clear()

	      // invoke passed block
	      if (typeof block == 'function')
	        block.call(this, this)

	      return this
	    }
	    // Return the fill id
	  , toString: function() {
	      return 'url(#' + this.id() + ')'
	    }
	  }

	  // Add parent method
	, construct: {
	    marker: function(width, height, block) {
	      // Create marker element in defs
	      return this.defs().marker(width, height, block)
	    }
	  }

	})

	SVG.extend(SVG.Defs, {
	  // Create marker
	  marker: function(width, height, block) {
	    // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
	    return this.put(new SVG.Marker)
	      .size(width, height)
	      .ref(width / 2, height / 2)
	      .viewbox(0, 0, width, height)
	      .attr('orient', 'auto')
	      .update(block)
	  }

	})

	SVG.extend(SVG.Line, SVG.Polyline, SVG.Polygon, SVG.Path, {
	  // Create and attach markers
	  marker: function(marker, width, height, block) {
	    var attr = ['marker']

	    // Build attribute name
	    if (marker != 'all') attr.push(marker)
	    attr = attr.join('-')

	    // Set marker attribute
	    marker = arguments[1] instanceof SVG.Marker ?
	      arguments[1] :
	      this.doc().marker(width, height, block)

	    return this.attr(attr, marker)
	  }

	})
	// Define list of available attributes for stroke and fill
	var sugar = {
	  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset']
	, fill:   ['color', 'opacity', 'rule']
	, prefix: function(t, a) {
	    return a == 'color' ? t : t + '-' + a
	  }
	}

	// Add sugar for fill and stroke
	;['fill', 'stroke'].forEach(function(m) {
	  var i, extension = {}

	  extension[m] = function(o) {
	    if (typeof o == 'undefined')
	      return this
	    if (typeof o == 'string' || SVG.Color.isRgb(o) || (o && typeof o.fill === 'function'))
	      this.attr(m, o)

	    else
	      // set all attributes from sugar.fill and sugar.stroke list
	      for (i = sugar[m].length - 1; i >= 0; i--)
	        if (o[sugar[m][i]] != null)
	          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]])

	    return this
	  }

	  SVG.extend(SVG.Element, SVG.FX, extension)

	})

	SVG.extend(SVG.Element, SVG.FX, {
	  // Map rotation to transform
	  rotate: function(d, cx, cy) {
	    return this.transform({ rotation: d, cx: cx, cy: cy })
	  }
	  // Map skew to transform
	, skew: function(x, y, cx, cy) {
	    return arguments.length == 1  || arguments.length == 3 ?
	      this.transform({ skew: x, cx: y, cy: cx }) :
	      this.transform({ skewX: x, skewY: y, cx: cx, cy: cy })
	  }
	  // Map scale to transform
	, scale: function(x, y, cx, cy) {
	    return arguments.length == 1  || arguments.length == 3 ?
	      this.transform({ scale: x, cx: y, cy: cx }) :
	      this.transform({ scaleX: x, scaleY: y, cx: cx, cy: cy })
	  }
	  // Map translate to transform
	, translate: function(x, y) {
	    return this.transform({ x: x, y: y })
	  }
	  // Map flip to transform
	, flip: function(a, o) {
	    return this.transform({ flip: a, offset: o })
	  }
	  // Map matrix to transform
	, matrix: function(m) {
	    return this.attr('transform', new SVG.Matrix(m))
	  }
	  // Opacity
	, opacity: function(value) {
	    return this.attr('opacity', value)
	  }
	  // Relative move over x axis
	, dx: function(x) {
	    return this.x((this instanceof SVG.FX ? 0 : this.x()) + x, true)
	  }
	  // Relative move over y axis
	, dy: function(y) {
	    return this.y((this instanceof SVG.FX ? 0 : this.y()) + y, true)
	  }
	  // Relative move over x and y axes
	, dmove: function(x, y) {
	    return this.dx(x).dy(y)
	  }
	})

	SVG.extend(SVG.Rect, SVG.Ellipse, SVG.Circle, SVG.Gradient, SVG.FX, {
	  // Add x and y radius
	  radius: function(x, y) {
	    var type = (this._target || this).type;
	    return type == 'radial' || type == 'circle' ?
	      this.attr('r', new SVG.Number(x)) :
	      this.rx(x).ry(y == null ? x : y)
	  }
	})

	SVG.extend(SVG.Path, {
	  // Get path length
	  length: function() {
	    return this.node.getTotalLength()
	  }
	  // Get point at length
	, pointAt: function(length) {
	    return this.node.getPointAtLength(length)
	  }
	})

	SVG.extend(SVG.Parent, SVG.Text, SVG.FX, {
	  // Set font
	  font: function(o) {
	    for (var k in o)
	      k == 'leading' ?
	        this.leading(o[k]) :
	      k == 'anchor' ?
	        this.attr('text-anchor', o[k]) :
	      k == 'size' || k == 'family' || k == 'weight' || k == 'stretch' || k == 'variant' || k == 'style' ?
	        this.attr('font-'+ k, o[k]) :
	        this.attr(k, o[k])

	    return this
	  }
	})

	SVG.Set = SVG.invent({
	  // Initialize
	  create: function(members) {
	    // Set initial state
	    Array.isArray(members) ? this.members = members : this.clear()
	  }

	  // Add class methods
	, extend: {
	    // Add element to set
	    add: function() {
	      var i, il, elements = [].slice.call(arguments)

	      for (i = 0, il = elements.length; i < il; i++)
	        this.members.push(elements[i])

	      return this
	    }
	    // Remove element from set
	  , remove: function(element) {
	      var i = this.index(element)

	      // remove given child
	      if (i > -1)
	        this.members.splice(i, 1)

	      return this
	    }
	    // Iterate over all members
	  , each: function(block) {
	      for (var i = 0, il = this.members.length; i < il; i++)
	        block.apply(this.members[i], [i, this.members])

	      return this
	    }
	    // Restore to defaults
	  , clear: function() {
	      // initialize store
	      this.members = []

	      return this
	    }
	    // Get the length of a set
	  , length: function() {
	      return this.members.length
	    }
	    // Checks if a given element is present in set
	  , has: function(element) {
	      return this.index(element) >= 0
	    }
	    // retuns index of given element in set
	  , index: function(element) {
	      return this.members.indexOf(element)
	    }
	    // Get member at given index
	  , get: function(i) {
	      return this.members[i]
	    }
	    // Get first member
	  , first: function() {
	      return this.get(0)
	    }
	    // Get last member
	  , last: function() {
	      return this.get(this.members.length - 1)
	    }
	    // Default value
	  , valueOf: function() {
	      return this.members
	    }
	    // Get the bounding box of all members included or empty box if set has no items
	  , bbox: function(){
	      var box = new SVG.BBox()

	      // return an empty box of there are no members
	      if (this.members.length == 0)
	        return box

	      // get the first rbox and update the target bbox
	      var rbox = this.members[0].rbox()
	      box.x      = rbox.x
	      box.y      = rbox.y
	      box.width  = rbox.width
	      box.height = rbox.height

	      this.each(function() {
	        // user rbox for correct position and visual representation
	        box = box.merge(this.rbox())
	      })

	      return box
	    }
	  }

	  // Add parent method
	, construct: {
	    // Create a new set
	    set: function(members) {
	      return new SVG.Set(members)
	    }
	  }
	})

	SVG.FX.Set = SVG.invent({
	  // Initialize node
	  create: function(set) {
	    // store reference to set
	    this.set = set
	  }

	})

	// Alias methods
	SVG.Set.inherit = function() {
	  var m
	    , methods = []

	  // gather shape methods
	  for(var m in SVG.Shape.prototype)
	    if (typeof SVG.Shape.prototype[m] == 'function' && typeof SVG.Set.prototype[m] != 'function')
	      methods.push(m)

	  // apply shape aliasses
	  methods.forEach(function(method) {
	    SVG.Set.prototype[method] = function() {
	      for (var i = 0, il = this.members.length; i < il; i++)
	        if (this.members[i] && typeof this.members[i][method] == 'function')
	          this.members[i][method].apply(this.members[i], arguments)

	      return method == 'animate' ? (this.fx || (this.fx = new SVG.FX.Set(this))) : this
	    }
	  })

	  // clear methods for the next round
	  methods = []

	  // gather fx methods
	  for(var m in SVG.FX.prototype)
	    if (typeof SVG.FX.prototype[m] == 'function' && typeof SVG.FX.Set.prototype[m] != 'function')
	      methods.push(m)

	  // apply fx aliasses
	  methods.forEach(function(method) {
	    SVG.FX.Set.prototype[method] = function() {
	      for (var i = 0, il = this.set.members.length; i < il; i++)
	        this.set.members[i].fx[method].apply(this.set.members[i].fx, arguments)

	      return this
	    }
	  })
	}




	SVG.extend(SVG.Element, {
	  // Store data values on svg nodes
	  data: function(a, v, r) {
	    if (typeof a == 'object') {
	      for (v in a)
	        this.data(v, a[v])

	    } else if (arguments.length < 2) {
	      try {
	        return JSON.parse(this.attr('data-' + a))
	      } catch(e) {
	        return this.attr('data-' + a)
	      }

	    } else {
	      this.attr(
	        'data-' + a
	      , v === null ?
	          null :
	        r === true || typeof v === 'string' || typeof v === 'number' ?
	          v :
	          JSON.stringify(v)
	      )
	    }

	    return this
	  }
	})
	SVG.extend(SVG.Element, {
	  // Remember arbitrary data
	  remember: function(k, v) {
	    // remember every item in an object individually
	    if (typeof arguments[0] == 'object')
	      for (var v in k)
	        this.remember(v, k[v])

	    // retrieve memory
	    else if (arguments.length == 1)
	      return this.memory()[k]

	    // store memory
	    else
	      this.memory()[k] = v

	    return this
	  }

	  // Erase a given memory
	, forget: function() {
	    if (arguments.length == 0)
	      this._memory = {}
	    else
	      for (var i = arguments.length - 1; i >= 0; i--)
	        delete this.memory()[arguments[i]]

	    return this
	  }

	  // Initialize or return local memory object
	, memory: function() {
	    return this._memory || (this._memory = {})
	  }

	})
	// Method for getting an element by id
	SVG.get = function(id) {
	  var node = document.getElementById(idFromReference(id) || id)
	  return SVG.adopt(node)
	}

	// Select elements by query string
	SVG.select = function(query, parent) {
	  return new SVG.Set(
	    SVG.utils.map((parent || document).querySelectorAll(query), function(node) {
	      return SVG.adopt(node)
	    })
	  )
	}

	SVG.extend(SVG.Parent, {
	  // Scoped select method
	  select: function(query) {
	    return SVG.select(query, this.node)
	  }

	})
	function is(el, obj){
	  return el instanceof obj
	}

	// tests if a given selector matches an element
	function matches(el, selector) {
	  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	}

	// Convert dash-separated-string to camelCase
	function camelCase(s) {
	  return s.toLowerCase().replace(/-(.)/g, function(m, g) {
	    return g.toUpperCase()
	  })
	}

	// Capitalize first letter of a string
	function capitalize(s) {
	  return s.charAt(0).toUpperCase() + s.slice(1)
	}

	// Ensure to six-based hex
	function fullHex(hex) {
	  return hex.length == 4 ?
	    [ '#',
	      hex.substring(1, 2), hex.substring(1, 2)
	    , hex.substring(2, 3), hex.substring(2, 3)
	    , hex.substring(3, 4), hex.substring(3, 4)
	    ].join('') : hex
	}

	// Component to hex value
	function compToHex(comp) {
	  var hex = comp.toString(16)
	  return hex.length == 1 ? '0' + hex : hex
	}

	// Calculate proportional width and height values when necessary
	function proportionalSize(element, width, height) {
	  if (width == null || height == null) {
	    var box = element.bbox()

	    if (width == null)
	      width = box.width / box.height * height
	    else if (height == null)
	      height = box.height / box.width * width
	  }

	  return {
	    width:  width
	  , height: height
	  }
	}

	// Delta transform point
	function deltaTransformPoint(matrix, x, y) {
	  return {
	    x: x * matrix.a + y * matrix.c + 0
	  , y: x * matrix.b + y * matrix.d + 0
	  }
	}

	// Map matrix array to object
	function arrayToMatrix(a) {
	  return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
	}

	// Parse matrix if required
	function parseMatrix(matrix) {
	  if (!(matrix instanceof SVG.Matrix))
	    matrix = new SVG.Matrix(matrix)

	  return matrix
	}

	// Add centre point to transform object
	function ensureCentre(o, target) {
	  o.cx = o.cx == null ? target.bbox().cx : o.cx
	  o.cy = o.cy == null ? target.bbox().cy : o.cy
	}

	// Convert string to matrix
	function stringToMatrix(source) {
	  // remove matrix wrapper and split to individual numbers
	  source = source
	    .replace(SVG.regex.whitespace, '')
	    .replace(SVG.regex.matrix, '')
	    .split(SVG.regex.matrixElements)

	  // convert string values to floats and convert to a matrix-formatted object
	  return arrayToMatrix(
	    SVG.utils.map(source, function(n) {
	      return parseFloat(n)
	    })
	  )
	}

	// Calculate position according to from and to
	function at(o, pos) {
	  // number recalculation (don't bother converting to SVG.Number for performance reasons)
	  return typeof o.from == 'number' ?
	    o.from + (o.to - o.from) * pos :

	  // instance recalculation
	  o instanceof SVG.Color || o instanceof SVG.Number || o instanceof SVG.Matrix ? o.at(pos) :

	  // for all other values wait until pos has reached 1 to return the final value
	  pos < 1 ? o.from : o.to
	}

	// PathArray Helpers
	function arrayToString(a) {
	  for (var i = 0, il = a.length, s = ''; i < il; i++) {
	    s += a[i][0]

	    if (a[i][1] != null) {
	      s += a[i][1]

	      if (a[i][2] != null) {
	        s += ' '
	        s += a[i][2]

	        if (a[i][3] != null) {
	          s += ' '
	          s += a[i][3]
	          s += ' '
	          s += a[i][4]

	          if (a[i][5] != null) {
	            s += ' '
	            s += a[i][5]
	            s += ' '
	            s += a[i][6]

	            if (a[i][7] != null) {
	              s += ' '
	              s += a[i][7]
	            }
	          }
	        }
	      }
	    }
	  }

	  return s + ' '
	}

	// Deep new id assignment
	function assignNewId(node) {
	  // do the same for SVG child nodes as well
	  for (var i = node.childNodes.length - 1; i >= 0; i--)
	    if (node.childNodes[i] instanceof SVGElement)
	      assignNewId(node.childNodes[i])

	  return SVG.adopt(node).id(SVG.eid(node.nodeName))
	}

	// Add more bounding box properties
	function fullBox(b) {
	  if (b.x == null) {
	    b.x      = 0
	    b.y      = 0
	    b.width  = 0
	    b.height = 0
	  }

	  b.w  = b.width
	  b.h  = b.height
	  b.x2 = b.x + b.width
	  b.y2 = b.y + b.height
	  b.cx = b.x + b.width / 2
	  b.cy = b.y + b.height / 2

	  return b
	}

	// Get id from reference string
	function idFromReference(url) {
	  var m = url.toString().match(SVG.regex.reference)

	  if (m) return m[1]
	}

	// Create matrix array for looping
	var abcdef = 'abcdef'.split('')
	// Add CustomEvent to IE9 and IE10
	if (typeof CustomEvent !== 'function') {
	  // Code from: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
	  var CustomEvent = function(event, options) {
	    options = options || { bubbles: false, cancelable: false, detail: undefined }
	    var e = document.createEvent('CustomEvent')
	    e.initCustomEvent(event, options.bubbles, options.cancelable, options.detail)
	    return e
	  }

	  CustomEvent.prototype = window.Event.prototype

	  window.CustomEvent = CustomEvent
	}

	// requestAnimationFrame / cancelAnimationFrame Polyfill with fallback based on Paul Irish
	(function(w) {
	  var lastTime = 0
	  var vendors = ['moz', 'webkit']

	  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    w.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame']
	    w.cancelAnimationFrame  = w[vendors[x] + 'CancelAnimationFrame'] ||
	                              w[vendors[x] + 'CancelRequestAnimationFrame']
	  }

	  w.requestAnimationFrame = w.requestAnimationFrame ||
	    function(callback) {
	      var currTime = new Date().getTime()
	      var timeToCall = Math.max(0, 16 - (currTime - lastTime))

	      var id = w.setTimeout(function() {
	        callback(currTime + timeToCall)
	      }, timeToCall)

	      lastTime = currTime + timeToCall
	      return id
	    }

	  w.cancelAnimationFrame = w.cancelAnimationFrame || w.clearTimeout;

	}(window))

	return SVG

	}));

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=test2.js.map