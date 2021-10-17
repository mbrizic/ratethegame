import { PotentialUser } from "../../server/users/users.dto";

export interface Page<T> {
    (model: T): string;
};

export interface PageModel {
    user: PotentialUser
    errorMessage?: string | null;
}

export interface SimpleComponent {
    (): string | null;
};

export interface Component<T> {
    (model: T): string | null;
};
