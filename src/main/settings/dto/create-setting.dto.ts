import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsString()
  aboutUsAr: string;

  @IsNotEmpty()
  @IsString()
  aboutUsEn: string;

  @IsNotEmpty()
  @IsMobilePhone('ar-KW', {})
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
  })
  facebookPage: string;

  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
  })
  xPage: string;

  @IsNotEmpty()
  @IsUrl({
    require_protocol: true,
  })
  instagramPage: string;

  @IsString()
  @IsOptional()
  mapLocation: string;

  @IsNotEmpty()
  @IsString()
  locationAr: string;

  @IsNotEmpty()
  @IsString()
  locationEn: string;

  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @IsNotEmpty()
  @IsString()
  nameAr: string;
}
