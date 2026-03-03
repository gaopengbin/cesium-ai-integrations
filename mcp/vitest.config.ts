import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "servers/*/test/**/*.test.ts",
      "PoC/CesiumJs/packages/*/test/**/*.test.ts",
    ],
    setupFiles: ["PoC/CesiumJs/packages/client-core/test/setup/cesium-mock.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["servers/*/src/**/*.ts", "PoC/CesiumJs/packages/*/src/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        "**/index.ts",
        "**/*.d.ts",
        "**/build/**",
        "**/test/**",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@cesium-mcp/shared": path.resolve(__dirname, "./servers/shared/src"),
    },
  },
});
