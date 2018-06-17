import * as THREE from 'three'
class CylinderGeometry
{
    /**
     * Constructor
     */
    constructor(radiusTop, radiusBottom,height,radialSegments,heightSegments, thetaStart,thetaLength, color, open )
    {
        this.radiusTop = radiusTop
        this.radiusBottom = radiusBottom
        this.height = height
        this.radialSegments = radialSegments
        this.heightSegments = heightSegments
        this.thetaStart = thetaStart
        this.thetaLength = thetaLength
        this.color = color
        this.open = open
    }

    /**
     * Methods
     */
    draw()
    {
        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, this.radialSegments, this.heightSegments,this.open ,this.thetaStart, this.thetaLength),
            new THREE.MeshBasicMaterial({ color : `#${this.color}`, side : THREE.DoubleSide, wireframe : true})
        )
        return cylinder
    }
}

export default CylinderGeometry