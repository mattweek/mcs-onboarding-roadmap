import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
declare global {
    interface JQuery {
        modal(action: string): JQuery;
    }
}
export interface IMcsRoadmapWebPartProps {
    roadmapImageUrl: string;
    stone1BaseUrl: string;
    stone1HoverUrl: string;
    stone1Label: string;
    modal1Content: string;
}
export default class McsRoadmapWebPart extends BaseClientSideWebPart<IMcsRoadmapWebPartProps> {
    render(): void;
    onInit(): Promise<void>;
    private loadScriptsAndRender;
    private loadScript;
    private renderContent;
    getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected get disableReactivePropertyChanges(): boolean;
}
//# sourceMappingURL=McsRoadmapWebPart.d.ts.map