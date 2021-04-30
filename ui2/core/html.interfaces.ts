import { PotentialUser } from "../../server/users/users.dto";

export interface Page<T> {
    (model: T): string;
};

export interface PageModel {
    user: PotentialUser
}

export interface SimpleComponent {
    (): string;
};

export interface Component<T> {
    (model: T): string;
};
