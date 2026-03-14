import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ICommunicationServer, registerSearchTools, ToolRegistry } from "@cesium-mcp/shared";
import { registerCameraFlyTo } from "./camera-fly-to.js";
import { registerCameraSetView } from "./camera-set-view.js";
import { registerCameraLookAtTransform } from "./camera-look-at-transform.js";
import { registerCameraStartOrbit } from "./camera-start-orbit.js";
import { registerCameraStopOrbit } from "./camera-stop-orbit.js";
import { registerCameraGetPosition } from "./camera-get-position.js";
import { registerCameraSetControllerOptions } from "./camera-set-controller-options.js";
import {
  CameraFlyToInputSchema,
  CameraSetViewInputSchema,
  CameraLookAtTransformInputSchema,
  CameraControllerOptionsSchema,
} from "../schemas/tool-schemas.js";
import { OrbitOptionsSchema } from "../schemas/tool-schemas.js";

const CAMERA_TOOL_REGISTRY: ToolRegistry = [
  {
    name: "camera_fly_to",
    title: "Fly Camera To",
    description: "Fly the camera to a geographic position with animation",
    inputSchema: CameraFlyToInputSchema.shape,
  },
  {
    name: "camera_set_view",
    title: "Set Camera View",
    description: "Instantly set the camera to a position and orientation",
    inputSchema: CameraSetViewInputSchema.shape,
  },
  {
    name: "camera_look_at_transform",
    title: "Look At Transform",
    description: "Point the camera at a target position with an offset",
    inputSchema: CameraLookAtTransformInputSchema.shape,
  },
  {
    name: "camera_start_orbit",
    title: "Start Camera Orbit",
    description: "Start orbiting around the current look-at target",
    inputSchema: OrbitOptionsSchema.shape,
  },
  {
    name: "camera_stop_orbit",
    title: "Stop Camera Orbit",
    description: "Stop the current camera orbit animation",
    inputSchema: {},
  },
  {
    name: "camera_get_position",
    title: "Get Camera Position",
    description: "Get comprehensive camera information including position, orientation, and view bounds",
    inputSchema: {},
  },
  {
    name: "camera_set_controller_options",
    title: "Set Camera Controller Options",
    description: "Configure camera movement constraints and behavior",
    inputSchema: CameraControllerOptionsSchema.shape,
  },
];

/**
 * Register all camera tools with the MCP server
 * @param server - The MCP server instance
 * @param communicationServer - The communication server for browser interaction
 */
export function registerCameraTools(
  server: McpServer,
  communicationServer: ICommunicationServer | undefined,
): void {
  if (!communicationServer) {
    throw new Error(
      "Camera tools require a communication server for browser visualization",
    );
  }

  // Register all camera tools
  registerCameraFlyTo(server, communicationServer);
  registerCameraSetView(server, communicationServer);
  registerCameraLookAtTransform(server, communicationServer);
  registerCameraStartOrbit(server, communicationServer);
  registerCameraStopOrbit(server, communicationServer);
  registerCameraGetPosition(server, communicationServer);
  registerCameraSetControllerOptions(server, communicationServer);

  registerSearchTools(server, CAMERA_TOOL_REGISTRY);
  console.error("✅ Registered 7 camera tools + search_tools");
}
