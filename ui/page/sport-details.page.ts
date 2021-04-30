import { GetSportDto } from "../../server/sports/sports.dto";
import { EventForm } from "../component/event-form.component";
import { SportComponent } from "../component/sport.component";
import { Column, Heading2 } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface SportDetailsModel extends PageModel {
    sport: GetSportDto;
}

export const SportDetailsPage: Page<SportDetailsModel> = (model: SportDetailsModel) => {

    return Layout(model,
        Column(
            SportComponent(model.sport),
            EventForm({
                sportId: model.sport.id,
                user: model.user,
            })
        )
    )

}