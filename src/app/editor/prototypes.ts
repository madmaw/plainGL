import {
  type ConvexSolid,
  type Project,
  type Scenery,
  ShaderType,
  WebGLVersion,
} from 'app/editor/model';

export const CUBE: Omit<ConvexSolid, 'name'> = {
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

const CUBE_SCENERY: Scenery = {
  attributes: new Map(),
  uniforms: new Map(),
  solid: {
    name: 'cube',
    ...CUBE,
  },
  program: undefined,
};

export const PROJECT: Project = {
  name: 'test project',
  scenes: [
    {
      name: 'test scene',
      scenery: [
        {
          ...CUBE_SCENERY,
          solid: {
            ...CUBE,
            name: 'test solid 1',
            offset: [
              -2,
              0,
              0,
            ],
          },
        },
        {
          ...CUBE_SCENERY,
          solid: {
            name: 'test composite 1',
            additions: [
              {
                ...CUBE,
                name: 'test addition 1',
                offset: [
                  2,
                  0,
                  0,
                ],
              },
            ],
            removals: [
              {
                name: 'test removal 1',
                planes: [
                  {
                    attributes: new Map(),
                    normal: [
                      1,
                      0,
                      0,
                    ],
                    position: [
                      0,
                      0,
                      0,
                    ],
                  },
                ],
                attributes: new Map(),
                offset: [
                  2,
                  0,
                  0,
                ],
              },
            ],
            attributes: new Map(),
            offset: [
              0,
              0,
              0,
            ],
          },
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
