-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('YES_NO', 'MULTIPLE_CHOICE');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "exires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionId")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "quizId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("quizId")
);

-- CreateTable
CREATE TABLE "Questions" (
    "questionId" SERIAL NOT NULL,
    "questionName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "questionType" "QuestionType" NOT NULL,
    "quizId" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "AnswerOptions" (
    "answerId" SERIAL NOT NULL,
    "answerText" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "AnswerOptions_pkey" PRIMARY KEY ("answerId")
);

-- CreateTable
CREATE TABLE "UserAnswers" (
    "userAnswerId" SERIAL NOT NULL,
    "answerText" TEXT NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "UserAnswers_pkey" PRIMARY KEY ("userAnswerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_sessionToken_key" ON "VerificationToken"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_sessionToken_key" ON "VerificationToken"("identifier", "sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Quizzes_title_key" ON "Quizzes"("title");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizzes" ADD CONSTRAINT "Quizzes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizzes"("quizId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOptions" ADD CONSTRAINT "AnswerOptions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;
