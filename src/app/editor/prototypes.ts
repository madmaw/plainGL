import {
  type ConvexSolid,
  type Project,
  ShaderType,
  type Solid,
  WebGLVersion,
} from 'app/editor/model';

export const CUBE: ConvexSolid = {
  name: undefined,
  attributes: new Map(),
  offset: [
    0,
    0,
    0,
  ],
  planes: [
    {
      attributes: new Map(),
      normal: [
        1,
        0,
        0,
      ],
      position: [
        1,
        0,
        0,
      ],
    },
    {
      attributes: new Map(),
      normal: [
        -1,
        0,
        0,
      ],
      position: [
        -1,
        0,
        0,
      ],
    },
    {
      attributes: new Map(),
      normal: [
        0,
        1,
        0,
      ],
      position: [
        0,
        1,
        0,
      ],
    },
    {
      attributes: new Map(),
      normal: [
        0,
        -1,
        0,
      ],
      position: [
        0,
        -1,
        0,
      ],
    },
    {
      attributes: new Map(),
      normal: [
        0,
        0,
        1,
      ],
      position: [
        0,
        0,
        1,
      ],
    },
    {
      attributes: new Map(),
      normal: [
        0,
        0,
        -1,
      ],
      position: [
        0,
        0,
        -1,
      ],
    },
  ],
};

export const CUBE_SOLID: Solid = {
  name: undefined,
  offset: [
    0,
    0,
    0,
  ],
  attributes: new Map(),
  parts: [
    {
      name: 'test concave solid',
      attributes: new Map(),
      base: CUBE,
      offset: [
        0,
        0,
        0,
      ],
      subtractions: [],
    },
  ],
  uniforms: new Map(),
};

export const PROJECT: Project = {
  name: 'test project',
  scenes: [
    {
      name: 'test scene',
      solids: [
        {
          ...CUBE_SOLID,
          name: 'test solid 1',
          offset: [
            -2,
            0,
            0,
          ],
        },
        {
          ...CUBE_SOLID,
          name: 'test solid 2',
          offset: [
            2,
            0,
            0,
          ],
        },
      ],
      program: {
        name: 'test program',
        webGLVersion: WebGLVersion.WebGL2,
        vertexShader: {
          name: 'test vertex shader',
          lines: [],
          type: ShaderType.Vertex,
        },
        fragmentShader: {
          name: 'test fragment shader',
          lines: [],
          type: ShaderType.Fragment,
        },
      },
      attributes: new Map(),
      uniforms: new Map(),
    },
  ],
};
