var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { SPComponentLoader } from '@microsoft/sp-loader';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// Import jQuery for Bootstrap compatibility
import * as $ from 'jquery';
var McsRoadmapWebPart = /** @class */ (function (_super) {
    __extends(McsRoadmapWebPart, _super);
    function McsRoadmapWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    McsRoadmapWebPart.prototype.render = function () {
        this.loadScriptsAndRender().catch(function (err) {
            console.error("Failed to load scripts:", err);
        });
    };
    McsRoadmapWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Load jQuery (if not already present)
                SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.6.0.min.js', {
                    globalExportsName: 'jQuery'
                }).then(function () {
                    // Load Bootstrap JS after jQuery is ready
                    return SPComponentLoader.loadScript('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js');
                }).catch(function (error) {
                    console.error('Error loading jQuery or Bootstrap JS:', error);
                });
                return [2 /*return*/, _super.prototype.onInit.call(this)];
            });
        });
    };
    McsRoadmapWebPart.prototype.loadScriptsAndRender = function () {
        var _this = this;
        return this.loadScript("".concat(this.context.pageContext.web.absoluteUrl, "/SiteAssets/roadmap/js/jquery.min.js"))
            .then(function () { return _this.loadScript("".concat(_this.context.pageContext.web.absoluteUrl, "/SiteAssets/roadmap/js/bootstrap.min.js")); })
            .then(function () {
            console.log("Bootstrap loaded successfully.");
            _this.renderContent();
        })
            .catch(function (error) {
            console.error("Script load error:", error);
        });
    };
    McsRoadmapWebPart.prototype.loadScript = function (src) {
        return new Promise(function (resolve, reject) {
            var scriptTag = document.createElement("script");
            scriptTag.src = src;
            scriptTag.onload = function () { return resolve(); };
            scriptTag.onerror = function (e) { return reject(e); };
            document.body.appendChild(scriptTag);
        });
    };
    McsRoadmapWebPart.prototype.renderContent = function () {
        var roadmapImageUrl = this.properties.roadmapImageUrl || 'https://collaboration.merck.com/sites/mcsframework/SiteAssets/roadmap/images/onboarding-roadmap.png';
        var stone1BaseUrl = this.properties.stone1BaseUrl || 'https://collaboration.merck.com/sites/mcsframework/SiteAssets/roadmap/images/icons/icon_general-tech%20set-up.png';
        var stone1HoverUrl = this.properties.stone1HoverUrl || 'https://collaboration.merck.com/sites/mcsframework/SiteAssets/roadmap/images/icons/icon_general-tech-set-up-hover.png';
        var stone1Label = this.properties.stone1Label || 'Tech set-up';
        var modal1Content = this.properties.modal1Content || 'Test modal content';
        this.domElement.innerHTML = "\n      <link rel=\"stylesheet\" href=\"".concat(this.context.pageContext.web.absoluteUrl, "/SiteAssets/roadmap/css/bootstrap.min.css\" />\n      <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css\" crossorigin=\"anonymous\" />\n      <link rel=\"stylesheet\" href=\"").concat(this.context.pageContext.web.absoluteUrl, "/SiteAssets/roadmap/css/style.css\" />\n  \n      <div class=\"container-fluid container-shaded quarternary container-onboarding-roadmap\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <div id=\"themap\" class=\"the-map\">\n              <img src=\"").concat(roadmapImageUrl, "\" class=\"img-fluid w-100 img-roadmap\">\n  \n              <a href=\"#modal-stone-0\" role=\"button\" data-toggle=\"modal\" class=\"stone nine-stones stone-1\">\n                <img src=\"").concat(stone1BaseUrl, "\" class=\"img-fluid icon-stone default\">\n                <img src=\"").concat(stone1HoverUrl, "\" class=\"img-fluid icon-stone hover\">\n                <div>").concat(stone1Label, "</div>\n              </a>\n  \n              <!-- Debug button -->\n              <button id=\"testModalBtn\" class=\"btn btn-primary mt-3\">Test Modal</button>\n            </div>\n          </div>\n        </div>\n      </div>\n  \n      <div id=\"ModalArea\">\n        <div class=\"modal fade\" id=\"modal-stone-0\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"modal-stone-0-title\" aria-hidden=\"true\">\n          <div class=\"modal-dialog modal-lg modal-dialog-centered\" role=\"document\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\" id=\"modal-stone-0-title\">").concat(stone1Label, "</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body\">\n                ").concat(modal1Content, "\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ");
        // Modal initialization and click bindings
        $(document).ready(function () {
            // Debug modal show
            $("#testModalBtn").on("click", function () {
                $("#modal-stone-0").modal("show");
            });
            // Bind anchor click manually
            $("a[data-toggle='modal']").on("click", function (e) {
                e.preventDefault();
                var targetSelector = $(this).attr("href");
                if (targetSelector) {
                    var modalElement = $(targetSelector);
                    if (modalElement.length) {
                        modalElement.modal("show");
                    }
                    else {
                        console.error("Modal element not found for selector:", targetSelector);
                    }
                }
                else {
                    console.error("No modal target specified in href.");
                }
            });
        });
    };
    McsRoadmapWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: "Configure Roadmap Settings"
                    },
                    groups: [
                        {
                            groupName: "Roadmap Image",
                            groupFields: [
                                PropertyPaneTextField('roadmapImageUrl', {
                                    label: 'Roadmap Image URL',
                                    multiline: true
                                })
                            ]
                        },
                        {
                            groupName: "Stone 1 Configuration",
                            groupFields: [
                                PropertyPaneTextField('stone1BaseUrl', {
                                    label: 'Stone 1 Base URL',
                                    multiline: true
                                }),
                                PropertyPaneTextField('stone1HoverUrl', {
                                    label: 'Stone 1 Hover URL',
                                    multiline: true
                                }),
                                PropertyPaneTextField('stone1Label', {
                                    label: 'Stone 1 Label'
                                })
                            ]
                        },
                        {
                            groupName: "Modal 1 Content",
                            groupFields: [
                                PropertyPaneTextField('modal1Content', {
                                    label: 'Modal 1 Content'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(McsRoadmapWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    return McsRoadmapWebPart;
}(BaseClientSideWebPart));
export default McsRoadmapWebPart;
//# sourceMappingURL=McsRoadmapWebPart.js.map