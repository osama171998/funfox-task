const User = require("../../models").User
const UserBelongGroup = require("../../models").UserBelongGroup
const TaskManagers = require("../../models").TaskManagers
const { Op } = require("sequelize");
module.exports = {
    async login(req,res){
        try{ 

            const {username,password} = req.body
             await User.findOne({
                attributes:["id","userName","email"],
                where: {
                    [Op.or]: [{ userName: username }, { email: username }],
                    [Op.and]: [{ password: password }],
                  },
                  include:[{
                    model:UserBelongGroup,
                    required:true,
                    attributes:["id"]
                  }
                ],
                  raw: true
                }).then(async(response)=>{
                    if(response!==null){
                        const userTask = await TaskManagers.findAll({
                            where:{
                                uBI:response["UserBelongGroup.id"]
                            },
                            attributes:["id","task","description","status"],
                            raw:true
                        })
                        let objectPass = {
                            username:response.userName,
                            email:response.email,
                            tasks:userTask
                        }
                        return res.status(200).send({status:200,message:"Login Successfully",data:objectPass})
                    }
                    else{
                        return res.status(200).send({status:200,message:"No User Found",data:response})
                    }
                })

        }
        catch(error){
            return res.status(500).send({status:"false",msg:"Something went wrong",error:error.message})
        }
    }
}