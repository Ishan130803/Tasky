
interface Project{
    id:string;
    name:string;
    dueDate?:Date;
    users:string[];
    tasks:string[];

}
export {Project};