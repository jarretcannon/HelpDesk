import { Model, Sequelize } from "sequelize";
export declare class Request extends Model {
    helpId: number;
    name: string;
    email: string;
    description: string;
    status: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export declare function RequestFactory(sequelize: Sequelize): void;
//# sourceMappingURL=helpDesk.d.ts.map