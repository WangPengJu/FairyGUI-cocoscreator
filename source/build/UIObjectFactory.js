import { ObjectType, PackageItemType } from "./FieldTypes";
import { GButton } from "./GButton";
import { GComboBox } from "./GComboBox";
import { GComponent } from "./GComponent";
import { GGraph } from "./GGraph";
import { GGroup } from "./GGroup";
import { GImage } from "./GImage";
import { GLabel } from "./GLabel";
import { GList } from "./GList";
import { GLoader } from "./GLoader";
import { GLoader3D } from "./GLoader3D";
import { GMovieClip } from "./GMovieClip";
import { GProgressBar } from "./GProgressBar";
import { GRichTextField } from "./GRichTextField";
import { GScrollBar } from "./GScrollBar";
import { GSlider } from "./GSlider";
import { GTextField } from "./GTextField";
import { GTextInput } from "./GTextInput";
import { GTree } from "./GTree";
import { Decls, UIPackage } from "./UIPackage";
export class UIObjectFactory {
    constructor() {
    }
    static setExtension(url, type) {
        if (url == null)
            throw new Error("Invaild url: " + url);
        var pi = UIPackage.getItemByURL(url);
        if (pi)
            pi.extensionType = type;
        UIObjectFactory.extensions[url] = type;
    }
    static setLoaderExtension(type) {
        UIObjectFactory.loaderType = type;
    }
    static resolveExtension(pi) {
        var extensionType = UIObjectFactory.extensions["ui://" + pi.owner.id + pi.id];
        if (!extensionType)
            extensionType = UIObjectFactory.extensions["ui://" + pi.owner.name + "/" + pi.name];
        if (extensionType)
            pi.extensionType = extensionType;
    }
    static newObject(type, userClass) {
        var obj;
        UIObjectFactory.counter++;
        if (typeof type === 'number') {
            switch (type) {
                case ObjectType.Image:
                    return new GImage();
                case ObjectType.MovieClip:
                    return new GMovieClip();
                case ObjectType.Component:
                    return new GComponent();
                case ObjectType.Text:
                    return new GTextField();
                case ObjectType.RichText:
                    return new GRichTextField();
                case ObjectType.InputText:
                    return new GTextInput();
                case ObjectType.Group:
                    return new GGroup();
                case ObjectType.List:
                    return new GList();
                case ObjectType.Graph:
                    return new GGraph();
                case ObjectType.Loader:
                    if (UIObjectFactory.loaderType)
                        return new UIObjectFactory.loaderType();
                    else
                        return new GLoader();
                case ObjectType.Button:
                    return new GButton();
                case ObjectType.Label:
                    return new GLabel();
                case ObjectType.ProgressBar:
                    return new GProgressBar();
                case ObjectType.Slider:
                    return new GSlider();
                case ObjectType.ScrollBar:
                    return new GScrollBar();
                case ObjectType.ComboBox:
                    return new GComboBox();
                case ObjectType.Tree:
                    return new GTree();
                case ObjectType.Loader3D:
                    return new GLoader3D();
                default:
                    return null;
            }
        }
        else {
            if (type.type == PackageItemType.Component) {
                if (userClass)
                    obj = new userClass();
                else if (type.extensionType)
                    obj = new type.extensionType();
                else
                    obj = UIObjectFactory.newObject(type.objectType);
            }
            else
                obj = UIObjectFactory.newObject(type.objectType);
            if (obj)
                obj.packageItem = type;
        }
        return obj;
    }
}
UIObjectFactory.counter = 0;
UIObjectFactory.extensions = {};
Decls.UIObjectFactory = UIObjectFactory;