import winston, { createLogger, format } from 'winston'
import { sticky } from '../util/sticky.js'

const { combine, timestamp, label, metadata, printf } = format

const logFormat = printf(
  // eslint-disable-next-line no-shadow
  ({ level, message, timestamp, label, metadata }) =>
    `${timestamp}  [${label}] ${level}: ${message} ${
      metadata && Object.keys(metadata).length ? `=>\n  metadata: ${JSON.stringify(metadata, null, 2)}` : ''
    }`
)

export const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'APP_NAME' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    logFormat
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),

    new winston.transports.Console()
  ]
})

// if (process.env.NODE_ENV === "dev") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// };
