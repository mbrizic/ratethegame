import { SportModel } from "../../server/sports/sports.model";
import { UserModel } from "../../server/users/users.model";
import { EventForm } from "../component/event-form.component";
import { EventList } from "../component/event-list.component";
import { SportComponent } from "../component/sport.component";
import { Column, RowSpaced } from "../core/html.elements";
import { Page, PageModel } from "../core/html.interfaces";
import { Layout } from "../_Layout";

interface SportDetailsModel extends PageModel {
    sport: SportModel;
    userData: UserModel | undefined;
}

export const SportDetailsPage: Page<SportDetailsModel> = (model: SportDetailsModel) => {

    return Layout(model,
        Column(
            SportComponent({
                sport: model.sport, 
                userData: model.userData
            }),
            EventList(model.sport.events),
            EventForm({
                sportId: model.sport.id,
                user: model.user,
            })
        )
    )

}
