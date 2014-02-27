//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            var inputStr = JSON.stringify(checkioInput[0]) + "," + JSON.stringify(checkioInput[1]);

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + inputStr + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + inputStr + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + inputStr + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            if (explanation) {
                var canvas = new PaintingWallCanvas();
                canvas.prepare($content.find(".explanation")[0], checkioInput[0], checkioInput[1], rightResult, explanation[0], explanation[1]);
                canvas.draw(checkioInput[1]);
            }


            this_e.setAnimationHeight($content.height() + 60);

        });

        //This is for Tryit (but not necessary)
//        var $tryit;
//        ext.set_console_process_ret(function (this_e, ret) {
//            $tryit.find(".checkio-result").html("Result<br>" + ret);
//        });
//
//        ext.set_generate_animation_panel(function (this_e) {
//            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit'))).find('.tryit-content');
//            $tryit.find('.bn-check').click(function (e) {
//                e.preventDefault();
//                this_e.sendToConsoleCheckiO("something");
//                e.stopPropagation();
//                return false;
//            });
//        });

        function PaintingWallCanvas() {
            var format = Raphael.format;

            var colorOrange4 = "#F0801A";
            var colorOrange3 = "#FA8F00";
            var colorOrange2 = "#FAA600";
            var colorOrange1 = "#FABA00";

            var colorBlue4 = "#294270";
            var colorBlue3 = "#006CA9";
            var colorBlue2 = "#65A1CF";
            var colorBlue1 = "#8FC7ED";

            var colorGrey4 = "#737370";
            var colorGrey3 = "#9D9E9E";
            var colorGrey2 = "#C5C6C6";
            var colorGrey1 = "#EBEDED";

            var colorWhite = "#FFFFFF";

            var x0 = 10,
                y0 = 10;

            var cell = 10;
            var sizeX,
                sizeY;

            var attrLine = {"stroke-width": 2, "stroke": colorBlue4};
            var attrText = {"font-size": cell * 1.2, "stroke": colorBlue4, "font-family": "Verdana"};
            var freshPaint = {"stroke-width": 0, "fill": colorOrange3};
            var oldPaint = {"stroke-width": 0, "fill": colorGrey3};

            var paper;
            var rectSet;

            var lines;

            this.prepare = function (dom, required, ranges, answer, max_range, steps) {
                sizeX = cell * max_range + cell * 8;
                lines = (answer == -1 ? ranges.length : answer);
                sizeY = cell * 2 * (lines + 2);
                paper = Raphael(dom, sizeX, sizeY);
                rectSet = paper.set();

                paper.path(format("M{0},{1}H{2}", 0, 2 * cell, sizeX)).attr(attrLine);
                paper.path(format("M{0},{1}V{2}", 5 * cell, 0, cell * 2)).attr(attrLine);
                paper.path(format("M{0},{1}V{2}", (5 + max_range) * cell, 0, cell * 2)).attr(attrLine);
                paper.text(cell * 2.5, cell, "Ranges").attr(attrText);
                paper.text(sizeX / 2 + cell, cell, "Wall").attr(attrText);
                paper.text(sizeX - cell * 1.5, cell, "P").attr(attrText);


                for (var i = 0; i < lines; i++) {
                    paper.path(format("M{0},{1}H{2}", 0, (i + 2) * 2 * cell, sizeX)).attr(attrLine);
                    var rowSet = paper.set();
                    for (var j = 0; j < max_range; j++) {
                        rowSet.push(paper.rect((j + 5) * cell, (i + 1) * 2 * cell, cell, cell * 2).attr(attrLine));
                    }
                    rectSet.push(rowSet);
                    paper.text(cell * 2.5, cell * 2 * (i + 1.5), ranges[i]).attr(attrText);
                    paper.text(sizeX - cell * 1.5, cell * 2 * (i + 1.5), steps[i]).attr(attrText);
                }
            };

            this.draw = function (ranges) {
                for (var i = 0; i < lines; i++) {
                    paper.rect(
                        cell * (4 + ranges[i][0]),
                        cell * 2 * (i + 1),
                        (ranges[i][1] - ranges[i][0] + 1) * cell,
                        cell * 2).attr(freshPaint).toBack();
                }
                for (i = 0; i < lines - 1; i++) {
                    paper.rect(
                        cell * (4 + ranges[i][0]),
                        cell * 2 * (i + 2),
                        (ranges[i][1] - ranges[i][0] + 1) * cell,
                        cell * 2 * (lines - i - 1)).attr(oldPaint).toBack();
                }
            }
        }
    }
)
;
