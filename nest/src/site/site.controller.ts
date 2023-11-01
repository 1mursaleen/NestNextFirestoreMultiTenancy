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

import { Host } from './site.decorator';
import { Site } from './site.entity';
import { SiteService } from './site.service';

@Controller('api/site')
export class SiteController {
  constructor(private siteService: SiteService) {}

  @Get()
  async getSites(): Promise<Site[]> {
    try {
      const sites = await this.siteService.getSites();

      return sites;
    } catch (error) {
      throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getSite(@Param('id') id: string): Promise<Site> {
    try {
      const site = await this.siteService.getSite(id);
      if (!site) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }
      return site;
    } catch (error) {
      throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createSite(@Body() site: Site, @Host() host: string): Promise<string> {
    try {
      const createdId = await this.siteService.createSite(site, host);
      return createdId;
    } catch (error) {
      throw new HttpException(
        'Failed to create site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateSite(@Param('id') id: string, @Body() site: Site): Promise<void> {
    try {
      const result = await this.siteService.updateSite(id, site);
      if (!result) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Failed to update site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteSite(@Param('id') id: string): Promise<void> {
    try {
      const result = await this.siteService.deleteSite(id);

      if (!result) {
        throw new HttpException('Site not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(
        'Failed to delete site',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
