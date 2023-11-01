import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Subdomain } from './site.decorator';
import { SiteService } from './site.service';
import { DomainTypeEnum } from './site.type';

@Controller('api')
export class HomeController {
  constructor(private siteService: SiteService) {}

  @Get()
  async findSiteByDomain(@Subdomain() subdomain: string) {
    // return 'subdomain > ' + subdomain;
    if (!subdomain) {
      return {
        type: DomainTypeEnum.DOMAIN,
        site: null,
      };
    }

    const site = await this.siteService.findSiteByDomain(subdomain);

    if (!site) {
      throw new NotFoundException('Site not found');
    }

    return {
      type: DomainTypeEnum.SUBDOMAIN,
      site,
    };
  }
}
