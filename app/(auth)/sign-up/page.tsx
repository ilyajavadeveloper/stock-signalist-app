"use client";
import React from 'react';
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/forms/InputField";
import SelectField from "@/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/forms/CountrySelectField";
import FooterLink from "@/forms/FooterLink";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting}
    } = useForm<SignUpFormData>({
            defaultValues: {
                fullName: '',
                email: '',
                password: '',
                country: 'US',
                investmentGoals: 'Growth',
                riskTolerance: 'Medium',
                preferredIndustry: 'Technology'
            }, mode: 'onBlur'
        }
    );
    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log("Submitting...");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1 className='form-title'>Sign Up Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
               <InputField name="fullName" label='Full Name' placeholder='John Doe'  register={register} error={errors.fullName}
               validation={{required:'fullName is required',minlength:2}}/>
                <InputField name="email" label='Email' placeholder='Enter your email'  register={register} error={errors.email}
                            validation={{required:'Email is required',pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required'}}/>
                <InputField name="password " label='Password' placeholder='Enter a strong password' type='password'  register={register} error={errors.fullName}
                            validation={{required:'Password is required',minlength:8}}/>
           <CountrySelectField name='country' label='country' control={control} error={errors.country} required/>
                <SelectField name='investment goals' label='Investment Goals' placeholder='Selected your investment goal' options={INVESTMENT_GOALS}
                control={control} error={errors.investmentGoals} required/>
                <SelectField name='risk tolerance' label='Risk Tolerance' placeholder='Select your risk level' options={RISK_TOLERANCE_OPTIONS}
                             control={control} error={errors.riskTolerance} required/>
                <SelectField name='preferredIndustry' label='Preffered Industry' placeholder='Selected your preffered industry' options={PREFERRED_INDUSTRIES}
                             control={control} error={errors.preferredIndustry} required/>
                <Button type="submit" disabled className='yellow-btn w-full mt-5'>
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>
                <FooterLink text='Alreay have an account?' linkText='Sign In' href='/sign-in'/>
            </form>
        </>
    );
};
export default SignUp;
