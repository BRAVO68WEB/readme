import type { Request, Response } from 'express';

import WebFingerService from '../services/webfinger.service';

export default class WebFingerController extends WebFingerService {
    public identity = async (req: Request, res: Response) => {
        const resource = req.query.resource as string;
        return !resource || !resource.includes('acct:') ? res.status(400).send('Bad request. Please make sure "acct:USER@DOMAIN" is what you are sending as the "resource" query parameter.') : res.json({
                subject: resource,
                aliases: [
                    `https://${resource.split('@')[1]}/users/${resource.split('@')[0]}`
                ],
                links: [
                    {
                        rel: 'self',
                        type: 'application/activity+json',
                        href: `http://${resource.split('@')[1]}/users/${resource.split('@')[0].split(':')[1]}`
                    },
                    {
                        rel: 'self',
                        type: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
                        href: `http://${resource.split('@')[1]}/users/${resource.split('@')[0].split(':')[1]}`
                    }
                ]
            });
    };
}