import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Query {
    question: string;
    userId: Principal;
    collegeId: bigint;
}
export interface Response {
    userQuery: Query;
    answer: string;
    collegeId: bigint;
}
export interface College {
    id: bigint;
    faq: Array<{
        question: string;
        answer: string;
    }>;
    campusLife: string;
    contactInfo: string;
    courses: Array<string>;
    applicationDeadlines: string;
    name: string;
    description: string;
    campusFacilities: string;
    programs: Array<string>;
    tuitionFees: string;
    admissionsRequirements: string;
    scholarships: string;
}
export interface backendInterface {
    addCollege(name: string, description: string, admissionsRequirements: string, courses: Array<string>, programs: Array<string>, campusFacilities: string, campusLife: string, applicationDeadlines: string, tuitionFees: string, scholarships: string, contactInfo: string, faq: Array<{
        question: string;
        answer: string;
    }>): Promise<bigint>;
    askQuestion(question: string, collegeId: bigint): Promise<Response>;
    deleteUserHistory(): Promise<void>;
    getAllColleges(): Promise<Array<College>>;
    getCollege(id: bigint): Promise<College>;
    getUserHistory(userId: Principal): Promise<Array<Query>>;
    searchCollegesByName(searchText: string): Promise<Array<College>>;
    searchCollegesByProgram(searchText: string): Promise<Array<College>>;
}
