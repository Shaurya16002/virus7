class  slingshot {

constructor(bodyA,pointB){
        var options={
        stiffness:0.05,
        length:5,
        bodyA:bodyA,
        pointB:pointB
        }



        this.sling = Constraint.create(options);

        this.pointB = pointB;
        World.add(world,this.sling);


    }

    fly(){
        this.sling.bodyA = null;
    }

   attach(body){
    
    this.sling.bodyA = body;
 

   }
   display(){
   push()
    if(this.sling.bodyA){
    var pointA = this.sling.bodyA.position;
    var pointB =  this.pointB;

    strokeWeight(3)
    line(pointA.x,pointA.y,pointB.x,pointB.y);   
      }
     pop()
    }
}