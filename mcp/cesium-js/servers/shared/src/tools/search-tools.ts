import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { ZodRawShape } from "zod";

/** One entry in the tool registry */
export interface ToolRegistryEntry {
  name: string;
  title: string;
  description: string;
  inputSchema: ZodRawShape;
}

export type ToolRegistry = ToolRegistryEntry[];

function zodShapeToJsonSchema(shape: ZodRawShape): Record<string, unknown> {
  return z.toJSONSchema(z.object(shape)) as Record<string, unknown>;
}

export function registerSearchTools(
  server: McpServer,
  registry: ToolRegistry,
): void {
  server.registerTool(
    "search_tools",
    {
      title: "Search Available Tools",
      description:
        "Find tools by keyword. Use detailLevel='name' for discovery, " +
        "'name+description' for selection, 'full' to get the complete input schema " +
        "before calling a tool. Reduces token usage versus loading all tool definitions upfront.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe(
            "Keyword to filter tool names and descriptions. Omit to list all.",
          ),
        detailLevel: z
          .enum(["name", "name+description", "full"])
          .default("name+description")
          .describe(
            "Verbosity: 'name' = tool names only; " +
              "'name+description' = name + human description; " +
              "'full' = complete JSON Schema for the inputSchema",
          ),
      },
    },
    async ({ query, detailLevel }) => {
      const lowerQuery = query?.toLowerCase();

      const matches = registry.filter((entry) => {
        if (!lowerQuery) return true;
        return (
          entry.name.toLowerCase().includes(lowerQuery) ||
          entry.title.toLowerCase().includes(lowerQuery) ||
          entry.description.toLowerCase().includes(lowerQuery)
        );
      });

      const results = matches.map((entry) => {
        if (detailLevel === "name") {
          return { name: entry.name };
        }
        if (detailLevel === "name+description") {
          return {
            name: entry.name,
            title: entry.title,
            description: entry.description,
          };
        }
        // "full" — serialise the Zod shape to JSON Schema
        return {
          name: entry.name,
          title: entry.title,
          description: entry.description,
          inputSchema: zodShapeToJsonSchema(entry.inputSchema),
        };
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ count: results.length, tools: results }, null, 2),
          },
        ],
      };
    },
  );
}
