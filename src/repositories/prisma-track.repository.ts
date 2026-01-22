import { TrackRepository } from "./track.repository.interface";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const prismaTrackRepository: TrackRepository = {
    async getAll() {
        return prisma.track.findMany();
    },

    async findById(id: number) {
        return prisma.track.findUnique({
            where: {
                id
            }
        })
    },

    async create(data) {
        return prisma.track.create({
            data: {
                title: data.title,
                artist: data.artist
            }
        })
    },

    async update(id, data) {
        return prisma.track.update({
            where: {
                id
            },
            data: {
                title: data.title,
                artist: data.artist
            }
        })
    },

    async patch(id, data) {
        const updateData: any = {}
        if (data.title !== undefined) {
            updateData.title = data.title
        }
        if (data.artist !== undefined) {
            updateData.artist = data.artist
        }
        return prisma.track.update({
            where: {
                id,
            },
            data: updateData
        })
    },

    async delete(id: number) {
        await prisma.track.delete({
            where: {
                id
            }
        })
        return true
    },
};
