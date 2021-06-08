"use strict";

exports.__esModule = true;

var ai_1 = require("react-icons/ai");

var ai_2 = require("react-icons/ai");

var react_1 = require("react");

var react_redux_1 = require("react-redux");

var store_1 = require("app/store");

var canvasesSlice_1 = require("features/canvases/canvasesSlice");

var canvasSlice_1 = require("features/canvases/canvasSlice");

var router_1 = require("next/router");

var react_2 = require("@headlessui/react");

var labelSlice_1 = require("features/labels/labelSlice");

function ExplicitPproblem(props) {
  var _a = react_1.useState(false),
      canvasMenuOpen = _a[0],
      setCanvasMenuOpen = _a[1];

  var _b = react_1.useState(),
      title = _b[0],
      setTitle = _b[1];

  var canvas = react_redux_1.useSelector(function (state) {
    return state.canvas;
  }).canvas;
  var dispatch = store_1.useAppDispatch();
  var router = router_1.useRouter();
  var canvasId = router.query.canvasId;
  var areaId = props.number + 1;
  react_1.useEffect(function () {
    dispatch(canvasesSlice_1.fetchCanvases());
  }, [dispatch]);
  react_1.useEffect(function () {
    if (canvasId) {
      dispatch(canvasSlice_1.fetchCanvas(canvasId));
    }
  }, [canvasId]);

  var togglePopoverCanvasMenuOpen = function togglePopoverCanvasMenuOpen() {
    setCanvasMenuOpen(!canvasMenuOpen);
  };

  var handleInputChange = function handleInputChange(event) {
    setTitle(event.target.value);
  };

  var IconStyle = {
    fontSize: "27px",
    color: "#D8D8D8",
    marginRight: "4px",
    marginBottom: "4px"
  };
  var areaFlame = {
    padding: "8px"
  };
  return React.createElement(react_2.Popover, {
    onClick: togglePopoverCanvasMenuOpen,
    style: areaFlame
  }, React.createElement("div", {
    className: "flex w-auto mb-2"
  }, React.createElement("label", {
    className: "pr-2 pt-1 text-gray-600 font-semibold text-sm"
  }, canvas ? canvas["areas"][props.number]["area_type_text"] : null), React.createElement(ai_1.AiFillQuestionCircle, {
    style: IconStyle
  }), React.createElement(ai_2.AiFillPlusCircle, {
    style: IconStyle,
    "aria-hidden": "true"
  })), !canvasMenuOpen && canvas && !canvas["areas"][props.number]["labels"].length && React.createElement("p", {
    className: "text-gray-400 font-semibold text-xs"
  }, canvas ? canvas["areas"][props.number]["description"] : null), React.createElement("div", {
    className: "flex flex-wrap"
  }, canvas ? React.createElement(React.Fragment, null, canvas["areas"][props.number]["labels"].map(function (item) {
    return React.createElement("div", {
      className: "grid gap-6 bg-white sm:gap-5 sm:p-2 border-l-4 border-customgreen w-full rounded-md text-sm m-1",
      key: item.id
    }, React.createElement("p", null, item.title));
  })) : null), React.createElement(react_2.Transition, {
    show: canvasMenuOpen,
    as: react_1.Fragment,
    enter: "transition ease-out duration-50",
    enterFrom: "opacity-0 translate-y-1",
    enterTo: "opacity-100 translate-y-0",
    leave: "transition ease-in duration-50",
    leaveFrom: "opacity-100 translate-y-0",
    leaveTo: "opacity-0 translate-y-1"
  }, React.createElement(react_2.Popover.Panel, {
    className: "transform"
  }, React.createElement("div", {
    className: "rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden w-full"
  }, React.createElement("div", {
    className: "grid gap-6 bg-white sm:gap-5 sm:p-2 border-l-4 border-customgreen"
  }, React.createElement("input", {
    type: "text",
    autoFocus: true,
    onChange: handleInputChange,
    onKeyPress: function onKeyPress(e) {
      if (e.key == "Enter") {
        e.preventDefault();
        dispatch(labelSlice_1.newLabel(title, areaId, canvasId));
        togglePopoverCanvasMenuOpen();
      }
    },
    className: "border-gray-400 rounded-md mr-2"
  }))))));
}

exports["default"] = ExplicitPproblem;
;