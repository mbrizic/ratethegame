import { Column, Heading2, Paragraph } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface InfoModel extends PageModel { 
    infoMessage: string;
}

export const InfoPage: Page<InfoModel> = (model: InfoModel) => {

    return Layout(model,
        Column(
            Paragraph(model.infoMessage)
        )
    )

}
