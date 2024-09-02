// creating token and save in cookie


const sendToken = (user,statuscode,res)=>{
    const token = user.getJWTToken();

    // option for cookies
    const option = {
        expire:new Date(
            Date.now()+ process.env.COOKIE_EXPIRE * 24 *60*60*1000
        ),
        httpOnly:true,
    };

    res.status(statuscode).cookie("token",token,option).json({
        success:true,
        user,
        token
    })
}


module.exports = sendToken;