const { z } = require("zod");


const loginSchema = z.object({
    email: z
    .string({required_error:"Email is required"}).trim().min(5, {message: "Name must be at least of 5 character's"}).max(255, {message: "Name must not be more than 255 character's"}).email({message:"Invalid email address"}),
    password: z
    .string({required_error:"Password is required"}).trim().min(8, {message: "Password must be at least of 8 character's"}),
});

const signupSchema = z.object({
    username: z
    .string({required_error:"Username is required"}).trim().min(5, {message: "Name must be at least of 5 character's"}).max(255, {message: "Name must not be more than 255 character's"}),
    email: z
    .string({required_error:"Email is required"}).trim().min(5, {message: "ema must be at least of 5 character's"}).max(255, {message: "Name must not be more than 255 character's"}).email({message:"Invalid email address"}),
    contact: z
    .number({required_error:"Contact No. is required"}).min(10, {message: "Contact must be of 10 number's"}),
    password: z
    .string({required_error:"Password is required"}).trim().min(8, {message: "Password must be at least of 8 character's"}),
});

module.exports = {signupSchema, loginSchema};