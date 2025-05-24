-- CreateTable
CREATE TABLE "Assessee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pan" TEXT NOT NULL,
    "name" TEXT,
    "lastSyncedOn" DATETIME
);

-- CreateTable
CREATE TABLE "EProceeding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT,
    "ay" INTEGER,
    "assesseeId" INTEGER NOT NULL,
    CONSTRAINT "EProceeding_assesseeId_fkey" FOREIGN KEY ("assesseeId") REFERENCES "Assessee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "noticeId" TEXT NOT NULL,
    "section" TEXT,
    "noticeType" TEXT,
    "noticeDate" DATETIME,
    "dueDate" DATETIME,
    "noticePdfDocId" BIGINT,
    "eproceedingId" INTEGER NOT NULL,
    CONSTRAINT "Notice_eproceedingId_fkey" FOREIGN KEY ("eproceedingId") REFERENCES "EProceeding" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT,
    "responseDate" DATETIME,
    "remarks" TEXT,
    "noticeId" INTEGER NOT NULL,
    CONSTRAINT "Response_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Document" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "docId" BIGINT NOT NULL,
    "name" TEXT,
    "contentType" TEXT,
    "category" TEXT,
    "size" TEXT,
    "noticeId" INTEGER,
    "responseId" INTEGER,
    CONSTRAINT "Document_noticeId_fkey" FOREIGN KEY ("noticeId") REFERENCES "Notice" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Document_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Assessee_pan_key" ON "Assessee"("pan");

-- CreateIndex
CREATE UNIQUE INDEX "Notice_noticeId_key" ON "Notice"("noticeId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_docId_key" ON "Document"("docId");
