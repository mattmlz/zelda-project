import * as THREE from 'three'
class BoxGeometry
{
    /**
     * Constructor
     */
    constructor(width, height, depth, color)
    {
        this.width = width
        this.height = height
        this.depth = depth
        this.color = color
    }

    /**
     * Methods
     */
    draw()
    {
        const side = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.depth),
            new THREE.MeshBasicMaterial({ color : `#${this.color}`})
        )
        return side
    }
    drawTexture(name)
    {
        let texture = new THREE.TextureLoader().load( '../assets/textures/'+name+'.jpg' );
        
        const side = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.depth),
            new THREE.MeshStandardMaterial({ map : texture })
        )
        return side
    }
    drawTransparent()
    {
        
        const side = new THREE.Mesh(
            new THREE.BoxGeometry(this.width, this.height, this.depth),
            new THREE.MeshStandardMaterial({ color : `#${this.color}`, transparent : true, opacity : .2})
        )
        return side
    }
}

export default BoxGeometry