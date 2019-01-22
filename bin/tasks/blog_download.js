const BaseTask = require('./base_task').BaseTask;
const CONSTANTS = require('./constants');
const logger = require('gulplog');

class BlogTask extends BaseTask {
  constructor(taskName) {
    const requiredArgs = ['hapikey', 'pathToContextDir'];
    super(taskName, requiredArgs);
  }

  async run() {
    const args = this.args;
    const requestArgs = {
      hapikey: args.hapikey,
      casing: 'snake_r',
      limit: args.limit
    };
    logger.info('Fetching blogs');
    const blogObjects = await this.getObjects(CONSTANTS.BASE_BLOGS_API_URL, 'blogs', requestArgs)
    const portalId = blogObjects[0].portal_id;
    this.writeObjects(blogObjects, 'blogs', args.pathToContextDir, portalId);
  }
}

module.exports = { BlogTask }