import { User, Session } from 'next-auth'

export type ChainIdType = 5 | 421613 | 84531 | 80001 | 43113;

export type FormState = {
    title: string;
    description: string;
    tagline: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    contractUrl: string;
    category: string;
};

export type UserFormState = {
    name: string;
    linkedinUrl: string;
    githubUrl: string;
};

export type NewUserInterface = {
    name: string;
    linkedinUrl: string;
    githubUrl: string;
};

export interface ProjectInterface {
    title: string;
    description: string;
    tagline: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    contractUrl: string;
    category: string;
    id: string;
    createdBy: {
        name: string;
        email: string;
        avatarUrl: string;
        id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
    };
}

export interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}

export interface ProjectForm {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
}