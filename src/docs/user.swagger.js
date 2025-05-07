/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원 가입 API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               gender:
 *                 type: string
 *               birth:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *               detailAddress:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               preferences:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: 회원 가입 성공 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     preferCategory:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: 회원 가입 실패 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: U001
 *                     reason:
 *                       type: string
 *                     data:
 *                       type: object
 *                 success:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
/**
 * @swagger
 * /users/{userId}/reviews:
 *   get:
 *     summary: 특정 유저 리뷰 확인
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 유저 ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 특정 유저 리뷰 확인 성공 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           storeId:
 *                             type: number
 *                           userId:
 *                             type: number
 *                           content:
 *                             type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         cursor:
 *                           type: number
 *                           nullable: true
 */
/**
 * @swagger
 * /users/{userId}/missions:
 *   get:
 *     summary: 특정 유저 미션 확인
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: 유저 ID
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 특정 유저 미션 확인 성공 응답
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           storeId:
 *                             type: number
 *                           userId:
 *                             type: number
 *                           status:
 *                             type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         cursor:
 *                           type: number
 *                           nullable: true
 */
