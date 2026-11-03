import {Matrix4,Vector3,Euler,MathUtils} from 'three';
import {localPlacementBounds,normalizePose,poseQuaternion} from '../placement/geometry.js';
export function poseMatrix(part,value){const pose=normalizePose(value),bounds=localPlacementBounds(part,pose.rotation);return new Matrix4().compose(new Vector3(pose.position[0],pose.position[1],pose.position[2]-bounds.min.z),poseQuaternion(pose.rotation),new Vector3(1,1,1));}
export function deltaFromPose(part,base,target){return poseMatrix(part,target).multiply(poseMatrix(part,base).invert()).toArray();}
export function poseFromDelta(part,base,delta){const matrix=new Matrix4().fromArray(delta).multiply(poseMatrix(part,base)),rotation=new Euler().setFromRotationMatrix(matrix,'XYZ').toArray().slice(0,3).map(MathUtils.radToDeg),bounds=localPlacementBounds(part,rotation);return {rotation,position:[matrix.elements[12],matrix.elements[13],matrix.elements[14]+bounds.min.z]};}
