import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

// Include the necessary Bootstrap and jQuery types (Bootstrap's jQuery plugin)
import * as $ from 'jquery';
import 'bootstrap';

export interface IMcsRoadmapWebPartProps {
  roadmapImageUrl: string;
  stone1BaseUrl: string;
  stone1HoverUrl: string;
  stone1Label: string;
  modal1Content: string;
}

export default class McsRoadmapWebPart extends BaseClientSideWebPart<IMcsRoadmapWebPartProps> {

  public render(): void {
    this.loadScriptsAndRender();
  }

  private loadScriptsAndRender(): void {
    // First, load jQuery
    this.loadScript(`${this.context.pageContext.web.absoluteUrl}/SiteAssets/roadmap/js/jquery.min.js`)
      .then(() => {
        // After jQuery is loaded, load Bootstrap JS
        return this.loadScript(`${this.context.pageContext.web.absoluteUrl}/SiteAssets/roadmap/js/bootstrap.min.js`);
      })
      .then(() => {
        console.log("Bootstrap loaded successfully.");
        this.renderContent(); // Render only after scripts are ready
      })
      .catch((error) => {
        console.error("Script load error:", error);
      });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptTag = document.createElement("script");
      scriptTag.src = src;
      scriptTag.onload = () => resolve();
      scriptTag.onerror = (e) => reject(e);
      document.body.appendChild(scriptTag);
    });
  }

  private renderContent(): void {
    // Ensure fallback values are provided for undefined properties
    const roadmapImageUrl = this.properties.roadmapImageUrl || 'https://collaboration.merck.com/sites/mcsframework/SiteAssets/roadmap/images/onboarding-roadmap.png';
    const stone1BaseUrl = this.properties.stone1BaseUrl || 'https://collaboration.merck.com/sites/mcsframework/SiteAssets/roadmap/images/icons/icon_general-tech%20set-up.png';
    const stone1HoverUrl = this.properties.stone1HoverUrl || 'https://collaboration.merck.com/sites/mcsframework/SiteAssets/roadmap/images/icons/icon_general-tech-set-up-hover.png';
    const stone1Label = this.properties.stone1Label || 'Tech set-up';
    const modal1Content = this.properties.modal1Content || 'Test modal content';
  
    this.domElement.innerHTML = `
      <link rel="stylesheet" href="${this.context.pageContext.web.absoluteUrl}/SiteAssets/roadmap/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" crossorigin="anonymous" />
      <link rel="stylesheet" href="${this.context.pageContext.web.absoluteUrl}/SiteAssets/roadmap/css/style.css" />
    
      <div class="container-fluid container-shaded quarternary container-onboarding-roadmap">
        <div class="row">
          <div class="col-md-12">
            <div id="themap" class="the-map">
              <img src="${roadmapImageUrl}" class="img-fluid w-100 img-roadmap">
    
              <a href="#modal-stone-0" role="button" data-toggle="modal" class="stone nine-stones stone-1">
                <img src="${stone1BaseUrl}" class="img-fluid icon-stone default">
                <img src="${stone1HoverUrl}" class="img-fluid icon-stone hover">
                <div>${stone1Label}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    
      <div id="ModalArea">
        <div class="modal fade" id="modal-stone-0" tabindex="-1" role="dialog" aria-labelledby="modal-stone-0-title" aria-hidden="true">
          <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modal-stone-0-title">${stone1Label}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ${modal1Content}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Explicitly trigger modal when the link is clicked
    $(document).ready(() => {
      // Check if the modal function is available after content is loaded
      if (window.jQuery && window.jQuery.fn.modal) {
        console.log("Modal function is available.");
      } else {
        console.error("Modal function is not available.");
      }
  
      // Trigger modal on link click
      $("a[data-toggle='modal']").click(function (event) {
        event.preventDefault(); // Prevent default link behavior
        const target = $(this).attr("href");
        if (target) {
          const modalElement = $(target);
          if (modalElement.length > 0 && modalElement.hasClass('modal')) {
            (modalElement as JQuery<HTMLElement>).modal('show'); // Cast to JQuery<HTMLElement>
          } else {
            console.error("Target is not a valid modal element.");
          }
        } else {
          console.error("Modal target is undefined.");
        }
      });
    });
  }

  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }

  protected get disableReactivePropertyChanges(): boolean {
    return false;
  }
}
