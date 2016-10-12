from PIL import Image, ImageFilter


class ImageEditor():

    def __init__(self, image, filters):
        self.image = image
        self.filters = filters.split(',')

    def apply_filters(self):
        self.edited_image = Image.open(self.image)
        for filter in self.filters:
            if str(filter).lower() == "blur":
                self.edited_image = self.blur(self.edited_image)
            if str(filter).lower() == "detail":
                self.edited_image = self.detail(self.edited_image)
            if str(filter).lower() == "contour":
                self.edited_image = self.contour(self.edited_image)
            if str(filter).lower() == "edge_enhance":
                self.edited_image = self.edge_enhance(self.edited_image)
            if str(filter).lower() == "edge_enhance_more":
                self.edited_image = self.edge_enhance_more(self.edited_image)
            if str(filter).lower() == "emboss":
                self.edited_image = self.emboss(self.edited_image)
            if str(filter).lower() == "find_edges":
                self.edited_image = self.find_edges(self.edited_image)
            if str(filter).lower() == "gaussian_blur":
                self.edited_image = self.gaussian_blur(self.edited_image)
            if str(filter).lower() == "max_filter":
                self.edited_image = self.max_filter(self.edited_image)
            if str(filter).lower() == "min_filter":
                self.edited_image = self.min_filter(self.edited_image)
            if str(filter).lower() == "med_filter":
                self.edited_image = self.med_filter(self.edited_image)
            if str(filter).lower() == "mode_filter":
                self.edited_image = self.mode_filter(self.edited_image)
            if str(filter).lower() == "sharpen":
                self.edited_image = self.sharpen(self.edited_image)
            if str(filter).lower() == "smooth":
                self.edited_image = self.smooth(self.edited_image)
            if str(filter).lower() == "smooth_more":
                self.edited_image = self.smooth_more(self.edited_image)
            if str(filter).lower() == "unsharp_mask":
                self.edited_image = self.unsharp_mask(self.edited_image)
        return self.edited_image

    def blur(self, edited_image):
        return edited_image.filter(ImageFilter.BLUR)

    def detail(self, edited_image):
        return edited_image.filter(ImageFilter.DETAIL)

    def contour(self, edited_image):
        return edited_image.filter(ImageFilter.CONTOUR)

    def edge_enhance(self, edited_image):
        return edited_image.filter(ImageFilter.EDGE_ENHANCE)

    def edge_enhance_more(self, edited_image):
        return edited_image.filter(ImageFilter.EDGE_ENHANCE_MORE)

    def emboss(self, edited_image):
        return edited_image.filter(ImageFilter.EMBOSS)

    def find_edges(self, edited_image):
        return edited_image.filter(ImageFilter.FIND_EDGES)

    def gaussian_blur(self, edited_image):
        return edited_image.filter(ImageFilter.GaussianBlur)

    def max_filter(self, edited_image):
        return edited_image.filter(ImageFilter.MaxFilter)

    def min_filter(self, edited_image):
        return edited_image.filter(ImageFilter.MinFilter)

    def med_filter(self, edited_image):
        return edited_image.filter(ImageFilter.MedianFilter)

    def mode_filter(self, edited_image):
        return edited_image.filter(ImageFilter.ModeFilter)

    def sharpen(self, edited_image):
        return edited_image.filter(ImageFilter.SHARPEN)

    def smooth(self, edited_image):
        return edited_image.filter(ImageFilter.SMOOTH)

    def smooth_more(self, edited_image):
        return edited_image.filter(ImageFilter.SMOOTH_MORE)

    def unsharp_mask(self, edited_image):
        return edited_image.filter(ImageFilter.UnsharpMask)
