(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var analyticsUiComponents = require('analytics-ui-components');

angular.module('app', [
    analyticsUiComponents.name
]);

},{"analytics-ui-components":2}],2:[function(require,module,exports){
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.analyticsUiComponentsModule = factory());
}(this, (function () { 'use strict';

var LineChartComponent = (function () {
    function LineChartComponent() {
        this.bindings = {
            data: "<",
            axis: "<",
            propertyX: "@",
            propertyY: "@",
            width: "@",
            height: "@",
            margin: "@",
            dot: "@"
        };
        this.template = "<div class=\"ba-line-chart\"></div>";
        this.controller = LineChartComponentCtrl;
    }
    return LineChartComponent;
}());
var LineChartComponentCtrl = (function () {
    function LineChartComponentCtrl($element) {
        this.$element = $element;
        // previous value used for watching
        this.previousCycle = {};
        this.tick = 10;
        this.font = 20;
    }
    LineChartComponentCtrl.allValuesTheSame = function (arr, property) {
        var len = arr && arr.length;
        var first = arr[0] && arr[0][property];
        var val;
        for (var i = 0; i < len; i++) {
            val = arr[i] && arr[i][property];
            if (val !== first) {
                return false;
            }
        }
        return true;
    };
    LineChartComponentCtrl.prototype.$onInit = function () {
        this.w = Number(this.width) || 400;
        this.h = Number(this.height) || 200;
        this.marginX = Number(this.margin) || 5;
        this.dotSize = this.dot ? Number(this.dot) : 2;
        this.propX = this.propertyX || 'x';
        this.propY = this.propertyY || 'y';
    };
    LineChartComponentCtrl.prototype.$doCheck = function () {
        // whenever 'data' binding changes
        if (!angular.equals(this.previousCycle.data, this.data)) {
            // if there is data and no chart yet, create chart element
            if (this.data && this.data.length && !this.chartHTMLElement) {
                this.createChart();
            }
            // if there is chart element, draw the chart
            if (this.chartHTMLElement) {
                this.drawChart();
            }
            this.previousCycle.data = angular.copy(this.data);
        }
    };
    LineChartComponentCtrl.prototype.createChart = function () {
        this.chartHTMLElement = this.$element.children('.ba-line-chart')[0];
        this.svg = d3.select(this.chartHTMLElement)
            .style('width', this.w + 'px')
            .style('height', this.h + 'px')
            .append('svg')
            .attr('width', this.w)
            .attr('height', this.h);
        this.g = this.svg.append('g');
    };
    LineChartComponentCtrl.prototype.drawChart = function () {
        var _this = this;
        var axisX, axisY, labelX, labelY, tickX, tickY;
        var values = this.data.map(function (d) { return d[_this.propY]; });
        // if all y values are the same, the chart will be a horizontal line (needs to be placed in the middle)
        if (LineChartComponentCtrl.allValuesTheSame(this.data, this.propY)) {
            this.marginY = this.h / 2;
        }
        else {
            this.marginY = Number(this.margin) || 5;
        }
        var yMax = d3.max(values);
        var yMin = d3.min(values);
        var xMax = this.data.length - 1;
        // display axis even when the min y value is greater than 0
        if (this.axis && (yMin > 0)) {
            yMin = 0;
        }
        var y = d3.scale.linear().domain([yMax, yMin]).range([this.marginY, this.h - this.marginY]);
        var x = d3.scale.linear().domain([0, xMax]).range([this.marginX, this.w - this.marginX]);
        var line = d3.svg.line()
            .x(function (d, i) {
            var dx = (_this.propX in d) ? d[_this.propX] : i;
            return x(dx);
        })
            .y(function (d) { return y(d[_this.propY]); });
        var path = this.g.selectAll('path').data([this.data]);
        path.enter()
            .append('path')
            .attr('d', line(this.data));
        path.exit().remove();
        path.attr('d', line(this.data));
        var dots = this.g.selectAll('circle').data(this.data);
        dots.enter()
            .append('circle')
            .attr('class', 'ba-dot')
            .attr('cx', function (d, i) {
            var dx = (_this.propX in d) ? d[_this.propX] : i;
            return x(dx);
        })
            .attr('cy', function (d) {
            return y(d[_this.propY]);
        })
            .attr('r', this.dotSize);
        dots.exit().remove();
        dots.attr('cx', function (d, i) {
            var dx = (_this.propX in d) ? d[_this.propX] : i;
            return x(dx);
        })
            .attr('cy', function (d) { return y(d[_this.propY]); });
        if (this.axis) {
            axisX = this.g.selectAll('line.ba-axis-x').data([this.data]);
            axisX.enter()
                .append('line')
                .attr('class', 'ba-axis ba-axis-x')
                .attr('x1', x(0))
                .attr('y1', y(0))
                .attr('x2', x(xMax))
                .attr('y2', y(0));
            axisX.attr('x1', x(0))
                .attr('y1', y(0))
                .attr('x2', x(xMax))
                .attr('y2', y(0));
            axisY = this.g.selectAll('line.ba-axis-y').data([this.data]);
            axisY.enter()
                .append('line')
                .attr('class', 'ba-axis ba-axis-y')
                .attr('x1', x(0))
                .attr('y1', y(yMin))
                .attr('x2', x(0))
                .attr('y2', y(yMax));
            axisY.attr('x1', x(0))
                .attr('y1', y(yMin))
                .attr('x2', x(0))
                .attr('y2', y(yMax));
            labelX = this.g.selectAll('text.ba-label-x').data(x.ticks(xMax));
            labelX.enter()
                .append('text')
                .attr('class', 'ba-label-x')
                .text(String)
                .attr('x', function (d) { return x(d); })
                .attr('y', y(0) + this.tick + this.font)
                .attr('text-anchor', 'middle');
            labelX.exit().remove();
            labelX
                .attr('x', function (d) { return x(d); })
                .attr('y', y(0) + this.tick + this.font);
            labelY = this.g.selectAll('text.ba-label-y').data(y.ticks(5));
            labelY.enter()
                .append('text')
                .attr('class', 'ba-label-y')
                .text(String)
                .attr('x', x(0) - (this.tick + this.font))
                .attr('y', function (d) { return y(d); })
                .attr('text-anchor', 'end')
                .attr('dx', 10)
                .attr('dy', 4);
            labelY.exit().remove();
            labelY.attr('x', x(0) - (this.tick + this.font))
                .attr('y', function (d) { return y(d); });
            tickX = this.g.selectAll('line.ba-tick-x').data(x.ticks(5));
            tickX.enter().append('line')
                .attr('class', 'ba-tick-x')
                .attr('x1', function (d) { return x(d); })
                .attr('y1', y(0))
                .attr('x2', function (d) { return x(d); })
                .attr('y2', y(0) + this.tick);
            tickX.exit().remove();
            tickX
                .attr('x1', function (d) { return x(d); })
                .attr('y1', y(0))
                .attr('x2', function (d) { return x(d); })
                .attr('y2', y(0) + this.tick);
            tickY = this.g.selectAll('line.ba-tick-y').data(y.ticks(4));
            tickY.enter().append('line')
                .attr('class', 'ba-tick-y')
                .attr('y1', function (d) { return y(d); })
                .attr('x1', x(0) - this.tick)
                .attr('y2', function (d) { return y(d); })
                .attr('x2', x(0));
            tickY.exit().remove();
            tickY
                .attr('y1', function (d) { return y(d); })
                .attr('x1', x(0) - this.tick)
                .attr('y2', function (d) { return y(d); })
                .attr('x2', x(0));
        }
    };
    return LineChartComponentCtrl;
}());
// dependency injection
LineChartComponentCtrl.$inject = [
    '$element'
];

var lineChartModule = angular.module('analytics.uiComponents.lineChart', [])
    .component('baLineChart', new LineChartComponent());

var HorizontalBarComponent = (function () {
    function HorizontalBarComponent() {
        this.bindings = {
            data: "<baModel",
            extraData: "<baExtraModel",
            type: '@baType',
            width: "@baWidth",
            height: "@baHeight",
            marginx: "@baMarginX",
            marginy: "@baMarginY"
        };
        this.template = ['$attrs', function ($attrs) { return template[$attrs.baType || "0"]; }];
        this.controller = HorizontalBarComponentCtrl;
    }
    return HorizontalBarComponent;
}());
var HorizontalBarComponentCtrl = (function () {
    function HorizontalBarComponentCtrl($attrs) {
        this.$attrs = $attrs;
        this.MAIN = 'ba-main';
        this.EXTRA = 'ba-extra';
        this.EMPTY = 'ba-empty';
        this.boxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.variants = [];
    }
    HorizontalBarComponentCtrl.prototype.$onInit = function () {
        this.makeVariantsArray();
    };
    HorizontalBarComponentCtrl.prototype.$onChanges = function (changesObject) {
        if (changesObject.extraData) {
            var changes = changesObject.extraData;
            if (changes.currentValue !== changes.previousValue) {
                this.makeVariantsArray();
            }
        }
    };
    // type 0,1
    HorizontalBarComponentCtrl.prototype.percent = function (data) {
        var d = data;
        if (!d || !angular.isNumber(d)) {
            d = 0;
        }
        if (d < 0) {
            d = 0;
        }
        if (d > 100) {
            d = 100;
        }
        return d + "%";
    };
    // type 2
    HorizontalBarComponentCtrl.prototype.boxClass = function (index) {
        var mainIndex = Math.floor(this.data / 10);
        var extraIndex = Math.floor(this.extraData / 10);
        if (index < mainIndex) {
            return this.MAIN;
        }
        if (index < extraIndex) {
            return this.EXTRA;
        }
        return this.EMPTY;
    };
    // type 3
    HorizontalBarComponentCtrl.prototype.makeVariantsArray = function () {
        this.variants = [];
        for (var i = 0; i < this.extraData; i++) {
            this.variants.push(i);
        }
    };
    HorizontalBarComponentCtrl.prototype.variantClass = function (index) {
        if (index < this.data) {
            return this.MAIN;
        }
        else {
            return this.EXTRA;
        }
    };
    return HorizontalBarComponentCtrl;
}());
HorizontalBarComponentCtrl.$inject = ['$attrs'];
var template = [];
template[0] = "\n    <div class=\"ba-horizontal-bar ba-horizontal-bar--0\" ng-style=\"{width: ($ctrl.width || 400)+'px', height: ($ctrl.height || 200)+'px', padding: ($ctrl.marginy || 10)+'px '+($ctrl.marginx || 10)+'px' }\">\n        <div class=\"ba-back\">\n            <div class=\"ba-main\" ng-style=\"{width: $ctrl.percent($ctrl.data)}\"></div>\n            <div ng-if=\"$ctrl.$attrs.baExtraModel\" class=\"ba-extra\" ng-style=\"{left: $ctrl.percent($ctrl.extraData)}\"></div>\n        </div>\n    </div>\n";
template[1] = "\n    <div class=\"ba-horizontal-bar ba-horizontal-bar--1\" ng-style=\"{width: ($ctrl.width || 400)+'px', height: ($ctrl.height || 200)+'px', padding: ($ctrl.marginy || 10)+'px '+($ctrl.marginx || 10)+'px' }\">\n        <div class=\"ba-back\">\n            <div ng-if=\"$ctrl.$attrs.baExtraModel\" class=\"ba-extra\" ng-style=\"{width: $ctrl.percent($ctrl.extraData)}\"></div>\n            <div class=\"ba-main\" ng-style=\"{width: $ctrl.percent($ctrl.data)}\"></div>\n        </div>\n    </div>\n";
template[2] = "\n    <div class=\"ba-horizontal-bar ba-horizontal-bar--2\" ng-style=\"{width: ($ctrl.width || 400)+'px', height: ($ctrl.height || 200)+'px', padding: ($ctrl.marginy || 10)+'px '+($ctrl.marginx || 10)+'px' }\">\n        <div class=\"ba-back\">\n            <div class=\"ba-box\" ng-repeat=\"box in $ctrl.boxes\" ng-class=\"$ctrl.boxClass($index)\"></div>\n        </div>\n    </div>\n";
template[3] = "\n    <div class=\"ba-horizontal-bar ba-horizontal-bar--3\" ng-style=\"{width: ($ctrl.width || 400)+'px', height: ($ctrl.height || 200)+'px', padding: ($ctrl.marginy || 10)+'px '+($ctrl.marginx || 10)+'px' }\">\n        <div class=\"ba-back\">\n            <div class=\"ba-box\" ng-style=\"{width: (100 / $ctrl.extraData)+'%'}\" ng-repeat=\"variant in $ctrl.variants\" ng-class=\"$ctrl.variantClass($index)\"></div>\n        </div>\n    </div>\n";

var horizontalBarModule = angular.module('analytics.uiComponents.horizontalBar', [])
    .component('baHorizontalBar', new HorizontalBarComponent());

var uiComponentsModule = angular.module('analytics.uiComponents', [
    lineChartModule.name,
    horizontalBarModule.name
]);

return uiComponentsModule;

})));

},{}]},{},[1]);
