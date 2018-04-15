package com.biobest.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.biobest.dtos.AppUserDTO;

/**
 * Extends {@link ConstraintValidator}.
 * Custom validator used by {@link PasswordMatches} constraint annotation.
 * Contains logic for checking that two passwords match
 */
public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

	@Override
	public void initialize(PasswordMatches constraintAnnotation) {
	}

	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
        AppUserDTO appUser = (AppUserDTO) value;
		return appUser.getPassword().equals(appUser.getMatchPassword());
	}

}