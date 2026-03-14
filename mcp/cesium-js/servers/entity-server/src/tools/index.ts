import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ICommunicationServer, registerSearchTools, ToolRegistry } from "@cesium-mcp/shared";
import { registerAddPointEntity } from "./entity-add-point.js";
import { registerAddBillboardEntity } from "./entity-add-billboard.js";
import { registerAddLabelEntity } from "./entity-add-label.js";
import { registerAddModelEntity } from "./entity-add-model.js";
import { registerAddPolygonEntity } from "./entity-add-polygon.js";
import { registerAddPolylineEntity } from "./entity-add-polyline.js";
import { registerAddEllipseEntity } from "./entity-add-ellipse.js";
import { registerAddRectangleEntity } from "./entity-add-rectangle.js";
import { registerAddWallEntity } from "./entity-add-wall.js";
import { registerAddCylinderEntity } from "./entity-add-cylinder.js";
import { registerAddBoxEntity } from "./entity-add-box.js";
import { registerAddCorridorEntity } from "./entity-add-corridor.js";
import { registerListEntities } from "./entity-list.js";
import { registerRemoveEntity } from "./entity-remove.js";
import {
  AddPointEntityInputSchema,
  AddBillboardEntityInputSchema,
  AddLabelEntityInputSchema,
  AddModelEntityInputSchema,
  AddPolygonEntityInputSchema,
  AddPolylineEntityInputSchema,
  AddEllipseEntityInputSchema,
  AddRectangleEntityInputSchema,
  AddWallEntityInputSchema,
  AddCylinderEntityInputSchema,
  AddBoxEntityInputSchema,
  AddCorridorEntityInputSchema,
  ListEntitiesInputSchema,
  RemoveEntityInputSchema,
} from "../schemas/tool-schemas.js";

const ENTITY_TOOL_REGISTRY: ToolRegistry = [
  {
    name: "entity_add_point",
    title: "Add Point Entity",
    description: "Add a point marker at a geographic position",
    inputSchema: AddPointEntityInputSchema.shape,
  },
  {
    name: "entity_add_billboard",
    title: "Add Billboard Entity",
    description: "Add an image billboard anchored to a position",
    inputSchema: AddBillboardEntityInputSchema.shape,
  },
  {
    name: "entity_add_label",
    title: "Add Label Entity",
    description: "Add a text label at a position",
    inputSchema: AddLabelEntityInputSchema.shape,
  },
  {
    name: "entity_add_model",
    title: "Add 3D Model Entity",
    description: "Add a glTF/GLB 3D model at a position with optional orientation",
    inputSchema: AddModelEntityInputSchema.shape,
  },
  {
    name: "entity_add_polygon",
    title: "Add Polygon Entity",
    description: "Add a filled polygon shape on the globe",
    inputSchema: AddPolygonEntityInputSchema.shape,
  },
  {
    name: "entity_add_polyline",
    title: "Add Polyline Entity",
    description: "Add a line connecting multiple positions",
    inputSchema: AddPolylineEntityInputSchema.shape,
  },
  {
    name: "entity_add_ellipse",
    title: "Add Ellipse Entity",
    description: "Add an ellipse or circle centered at a position",
    inputSchema: AddEllipseEntityInputSchema.shape,
  },
  {
    name: "entity_add_rectangle",
    title: "Add Rectangle Entity",
    description: "Add an axis-aligned rectangle on the globe",
    inputSchema: AddRectangleEntityInputSchema.shape,
  },
  {
    name: "entity_add_wall",
    title: "Add Wall Entity",
    description: "Add a vertical wall along a polyline",
    inputSchema: AddWallEntityInputSchema.shape,
  },
  {
    name: "entity_add_cylinder",
    title: "Add Cylinder Entity",
    description: "Add a cylinder or cone at a position",
    inputSchema: AddCylinderEntityInputSchema.shape,
  },
  {
    name: "entity_add_box",
    title: "Add Box Entity",
    description: "Add a 3D box at a position with optional orientation",
    inputSchema: AddBoxEntityInputSchema.shape,
  },
  {
    name: "entity_add_corridor",
    title: "Add Corridor Entity",
    description: "Add a corridor (extruded polyline) shape",
    inputSchema: AddCorridorEntityInputSchema.shape,
  },
  {
    name: "entity_list",
    title: "List Entities",
    description: "List all current entities, optionally filtered by type",
    inputSchema: ListEntitiesInputSchema.shape,
  },
  {
    name: "entity_remove",
    title: "Remove Entity",
    description: "Remove one or all entities by ID or name pattern",
    inputSchema: RemoveEntityInputSchema.shape,
  },
];

/**
 * Register all entity tools with the MCP server
 */
export function registerEntityTools(
  server: McpServer,
  communicationServer: ICommunicationServer | undefined,
): void {
  if (!communicationServer) {
    throw new Error(
      "Entity tools require a communication server for browser visualization",
    );
  }

  // Register all entity tools
  registerAddPointEntity(server, communicationServer);
  registerAddBillboardEntity(server, communicationServer);
  registerAddLabelEntity(server, communicationServer);
  registerAddModelEntity(server, communicationServer);
  registerAddPolygonEntity(server, communicationServer);
  registerAddPolylineEntity(server, communicationServer);
  registerAddEllipseEntity(server, communicationServer);
  registerAddRectangleEntity(server, communicationServer);
  registerAddWallEntity(server, communicationServer);
  registerAddCylinderEntity(server, communicationServer);
  registerAddBoxEntity(server, communicationServer);
  registerAddCorridorEntity(server, communicationServer);
  registerListEntities(server, communicationServer);
  registerRemoveEntity(server, communicationServer);

  registerSearchTools(server, ENTITY_TOOL_REGISTRY);
  console.error("✅ Registered 14 entity tools + search_tools");
}
