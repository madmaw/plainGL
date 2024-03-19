import { deferredDescriptor } from 'base/descriptor/deferred';
import { listDescriptor } from 'base/descriptor/list';
import { LiteralTypeDescriptor } from 'base/descriptor/literal';
import { mapDescriptor } from 'base/descriptor/map';
import { optionalDescriptor } from 'base/descriptor/option';
import { recordDescriptor } from 'base/descriptor/record';
import { recordUnionDescriptor } from 'base/descriptor/record_union';
import { tupleDescriptor } from 'base/descriptor/tuple';
import { typedUnionDescriptor } from 'base/descriptor/typed_union';
import { type TypeDescriptor } from 'base/descriptor/types';

export const integerDescriptor = new LiteralTypeDescriptor<number>();

export const floatDescriptor = new LiteralTypeDescriptor<number>();

export const stringDescriptor = new LiteralTypeDescriptor<string>();
export const optionalStringDescriptor = optionalDescriptor(stringDescriptor);

export const booleanDescriptor = new LiteralTypeDescriptor<boolean>();

export type Vector2f = typeof vector2fDescriptor['aState'];
export type MutableVector2f = typeof vector2fDescriptor['aMutable'];
export const vector2fDescriptor = tupleDescriptor<[
  typeof floatDescriptor,
  typeof floatDescriptor,
]>([
  floatDescriptor,
  floatDescriptor,
]);

export type Vector3f = typeof vector3fDescriptor['aState'];
export type MutableVector3f = typeof vector3fDescriptor['aMutable'];
export const vector3fDescriptor = tupleDescriptor<[
  typeof floatDescriptor,
  typeof floatDescriptor,
  typeof floatDescriptor,
]>([
  floatDescriptor,
  floatDescriptor,
  floatDescriptor,
]);

export type Vector4f = typeof vector4fDescriptor['aState'];
export type MutableVector4f = typeof vector4fDescriptor['aMutable'];
export const vector4fDescriptor = tupleDescriptor<[
  typeof floatDescriptor,
  typeof floatDescriptor,
  typeof floatDescriptor,
  typeof floatDescriptor,
]>([
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
export const shaderParameterValueDescriptor = typedUnionDescriptor<ShaderParameterValue>({
  [ShaderParameterValueType.Float]: floatDescriptor,
  [ShaderParameterValueType.Integer]: integerDescriptor,
  [ShaderParameterValueType.Vector2f]: vector2fDescriptor,
  [ShaderParameterValueType.Vector3f]: vector3fDescriptor,
  [ShaderParameterValueType.Vector4f]: vector4fDescriptor,
});

export const shaderParametersDescriptor = mapDescriptor(
  shaderParameterValueDescriptor,
);

export type ShaderParameters = typeof shaderParametersDescriptor.aState;
export type MutableShaderParameters = typeof shaderParametersDescriptor.aMutable;

// export type Solid = typeof solidDescriptor['aState'];
// export type MutableSolid = typeof solidDescriptor['aMutable'];

export type Solid = ConvexSolid | CompositeSolid;
export type MutableSolid = MutableConvexSolid | MutableCompositeSolid;
export const solidDescriptor: TypeDescriptor<Solid, MutableSolid> = deferredDescriptor(
  function () {
    return recordUnionDescriptor(
      'planes',
      compositeSolidDescriptor,
      convexSolidDescriptor,
    );
  },
);

export type Plane = typeof planeDescriptor['aState'];
export type MutablePlane = typeof planeDescriptor['aMutable'];
export const planeDescriptor = recordDescriptor({
  position: vector3fDescriptor,
  normal: vector3fDescriptor,
  attributes: shaderParametersDescriptor,
});

export type ConvexSolid = typeof convexSolidDescriptor['aState'];
export type MutableConvexSolid = typeof convexSolidDescriptor['aMutable'];
export const convexSolidDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  offset: vector3fDescriptor,
  planes: listDescriptor(planeDescriptor),
  attributes: shaderParametersDescriptor,
});

// break the circular reference by explicitly stating types here
// export type CompositeSolid = typeof compositeSolidDescriptor['aState'];
// export type MutableCompositeSolid = typeof compositeSolidDescriptor['aMutable'];
export type CompositeSolid = {
  readonly name?: string,
  readonly planes?: undefined,
  readonly offset: Vector3f,
  readonly additions: readonly Solid[],
  readonly removals: readonly Solid[],
  readonly attributes: ShaderParameters,
};
export type MutableCompositeSolid = {
  name?: string,
  readonly planes?: undefined,
  offset: Vector3f,
  additions: MutableSolid[],
  removals: MutableSolid[],
  attributes: MutableShaderParameters,
  __aMutable: true,
};
export const compositeSolidDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  n: integerDescriptor,
  offset: vector3fDescriptor,
  additions: listDescriptor(solidDescriptor),
  removals: listDescriptor(solidDescriptor),
  attributes: shaderParametersDescriptor,
});

export type Scene = typeof sceneDescriptor['aState'];
export type MutableScene = typeof sceneDescriptor['aMutable'];
export const sceneDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  solids: listDescriptor(solidDescriptor),
  program: programDescriptor,
  attributes: shaderParametersDescriptor,
  uniforms: shaderParametersDescriptor,
});

export const projectDescriptor = recordDescriptor({
  name: optionalStringDescriptor,
  scenes: listDescriptor(sceneDescriptor),
});

export type Project = typeof projectDescriptor['aState'];
export type MutableProject = typeof projectDescriptor['aMutable'];
