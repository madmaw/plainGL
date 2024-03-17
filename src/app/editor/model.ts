import { listDescriptor } from 'base/descriptor/list';
import { LiteralTypeDescriptor } from 'base/descriptor/literal';
import { mapDescriptor } from 'base/descriptor/map';
import { optionalDescriptor } from 'base/descriptor/option';
import { recordDescriptor } from 'base/descriptor/record';
import { tupleDescriptor } from 'base/descriptor/tuple';
import { type TypeDescriptor } from 'base/descriptor/types';
import { unionDescriptor } from 'base/descriptor/union';

export const integerDescriptor = new LiteralTypeDescriptor<number>();

export const floatDescriptor = new LiteralTypeDescriptor<number>();

export const stringDescriptor = new LiteralTypeDescriptor<string>();
export const optionalStringDescriptor = optionalDescriptor(stringDescriptor);

export const booleanDescriptor = new LiteralTypeDescriptor<boolean>();

export const vector2fDescriptor = tupleDescriptor([
  floatDescriptor,
  floatDescriptor,
]);

export const vector3fDescriptor = tupleDescriptor([
  floatDescriptor,
  floatDescriptor,
  floatDescriptor,
]);

export const vector4fDescriptor = tupleDescriptor([
  floatDescriptor,
  floatDescriptor,
  floatDescriptor,
  floatDescriptor,
]);

export const enum ShaderType {
  Fragment = 1,
  Vertex,
}

export const shaderTypeDescriptor = new LiteralTypeDescriptor<ShaderType>();

export const enum WebGLVersion {
  WebGL1 = 1,
  WebGL2 = 2,
}

export const webGLVersionDescriptor = new LiteralTypeDescriptor<WebGLVersion>();

export const shaderDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  type: shaderTypeDescriptor,
  lines: listDescriptor(stringDescriptor),
});

export const programDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  webGLVersion: webGLVersionDescriptor,
  // TODO maybe enforce shader types here
  fragmentShader: shaderDescriptor,
  vertexShader: shaderDescriptor,
});

export const enum ShaderParameterValueType {
  Float = 1,
  Integer,
  Vector2f,
  Vector3f,
  Vector4f,
  // Mat2f,
  // Mat3f,
  // Mat4f,
  // Sampler2D,
  // SamplerCube,
}

export type ShaderParameterValue = Record<ShaderParameterValueType, TypeDescriptor>;
export const shaderParameterValueDescriptor = unionDescriptor<ShaderParameterValue>({
  [ShaderParameterValueType.Float]: floatDescriptor,
  [ShaderParameterValueType.Integer]: integerDescriptor,
  [ShaderParameterValueType.Vector2f]: vector2fDescriptor,
  [ShaderParameterValueType.Vector3f]: vector3fDescriptor,
  [ShaderParameterValueType.Vector4f]: vector4fDescriptor,
});

export const shaderParametersDescriptor = mapDescriptor(
  shaderParameterValueDescriptor,
);

export const planeDescriptor = recordDescriptor({
  position: vector3fDescriptor,
  normal: vector3fDescriptor,
  attributes: shaderParametersDescriptor,
});

export type Plane = typeof planeDescriptor['aState'];
export type MutablePlane = typeof planeDescriptor['aMutable'];

export const convexSolidDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  offset: vector3fDescriptor,
  planes: listDescriptor(planeDescriptor),
  attributes: shaderParametersDescriptor,
});

export type ConvexSolid = typeof convexSolidDescriptor['aState'];
export type MutableConvexSolid = typeof convexSolidDescriptor['aMutable'];

export const concaveSolidDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  offset: vector3fDescriptor,
  base: convexSolidDescriptor,
  subtractions: listDescriptor(convexSolidDescriptor),
  attributes: shaderParametersDescriptor,
});

export type ConcaveSolid = typeof concaveSolidDescriptor['aState'];
export type MutableConcaveSolid = typeof concaveSolidDescriptor['aMutable'];

export const solidDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  offset: vector3fDescriptor,
  parts: listDescriptor(concaveSolidDescriptor),
  attributes: shaderParametersDescriptor,
  uniforms: shaderParametersDescriptor,
});

export type Solid = typeof solidDescriptor['aState'];
export type MutableSolid = typeof solidDescriptor['aMutable'];

export const sceneDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  solids: listDescriptor(solidDescriptor),
  program: programDescriptor,
  attributes: shaderParametersDescriptor,
  uniforms: shaderParametersDescriptor,
});

export type Scene = typeof sceneDescriptor['aState'];
export type MutableScene = typeof sceneDescriptor['aMutable'];

export const projectDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  scenes: listDescriptor(sceneDescriptor),
});

export type Project = typeof projectDescriptor['aState'];
export type MutableProject = typeof projectDescriptor['aMutable'];
